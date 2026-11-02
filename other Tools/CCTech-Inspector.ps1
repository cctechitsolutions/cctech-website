# ============================================================================
# CCTech IT Solutions - Laptop Inspection & Report Generator v2.4
# ============================================================================

 $ErrorActionPreference = 'SilentlyContinue'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$Company      = "CCTech IT Solutions"
 $Version      = "2.4"
 $ReportDir    = "$env:USERPROFILE\Desktop\CCTech_Reports"
 $TempDir      = Join-Path $env:TEMP ("CCTech_Inspector_" + [guid]::NewGuid().ToString("N"))
 $DateStr      = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
 $FileStamp    = Get-Date -Format "yyyyMMdd_HHmmss"

if (!(Test-Path $ReportDir)) { New-Item -ItemType Directory -Path $ReportDir -Force | Out-Null }
if (!(Test-Path $TempDir))   { New-Item -ItemType Directory -Path $TempDir -Force | Out-Null }

function Write-Banner {
    Write-Host ""
    Write-Host "  +======================================================+" -ForegroundColor Cyan
    Write-Host "  |       CCTech IT Solutions                            |" -ForegroundColor Cyan
    Write-Host "  |       Laptop Inspection Tool  v$Version                  |" -ForegroundColor Cyan
    Write-Host "  +======================================================+" -ForegroundColor Cyan
    Write-Host ""
}
function Write-Section { param([string]$Title) Write-Host ""; Write-Host "  -- $Title --" -ForegroundColor Yellow; Write-Host "" }
function Write-OK   { param([string]$Msg) Write-Host "  [OK]   $Msg" -ForegroundColor Green }
function Write-FAIL { param([string]$Msg) Write-Host "  [FAIL] $Msg" -ForegroundColor Red }
function Write-NA   { param([string]$Msg) Write-Host "  [N/A]  $Msg" -ForegroundColor DarkGray }
function Write-INFO { param([string]$Msg) Write-Host "  [..]   $Msg" -ForegroundColor White }

function Ask-YesNo {
    param([string]$Question, [switch]$DefaultYes)
    $hint = "[Y/N]"
    if ($DefaultYes) { $hint = "[Y/N] (Y)" }
    do {
        $r = Read-Host "  $Question $hint"
        if ($r -eq '') { $r = if ($DefaultYes) { 'Y' } else { 'N' } }
    } while ($r -notmatch '^[YyNn]$')
    return $r -match '^[Yy]$'
}

function Get-PassFailBadge { param([string]$Status) switch ($Status) { "PASS" { return "PASS" } "FAIL" { return "FAIL" } default { return "N/A" } } }
function Get-BadgeClass { param([string]$Status) switch ($Status) { "PASS" { return "badge-pass" } "FAIL" { return "badge-fail" } default { return "badge-na" } } }

function Format-Bytes {
    param([long]$Bytes)
    if ($Bytes -ge 1TB) { return "{0:N1} TB" -f ($Bytes / 1TB) }
    if ($Bytes -ge 1GB) { return "{0:N1} GB" -f ($Bytes / 1GB) }
    if ($Bytes -ge 1MB) { return "{0:N1} MB" -f ($Bytes / 1MB) }
    return "$Bytes Bytes"
}

# -- Part 0: Initial Information --
Write-Banner
Write-Host "  Enter inspection details:" -ForegroundColor White
Write-Host ""
 $CustomerName   = Read-Host "  Seller or Customer Name"
 $TechnicianName = Read-Host "  Technician Name"
 $RemarksInput   = "None"

# -- Part 1: Automatic Hardware Scan --
Write-Section "PART 1 - Automatic Hardware Scan"

 $cs       = Get-CimInstance Win32_ComputerSystem
 $biosInfo = Get-CimInstance Win32_BIOS
 $Mfr      = $cs.Manufacturer.Trim()
 $Model    = $cs.Model.Trim()
 $Serial   = $biosInfo.SerialNumber.Trim()
if ([string]::IsNullOrWhiteSpace($Serial)) { $Serial = "UNKNOWN" }
Write-OK "$Mfr $Model (S/N: $Serial)"

 $chassisTypes = (Get-CimInstance Win32_SystemEnclosure).ChassisTypes
 $isLaptop = $chassisTypes -contains 9 -or $chassisTypes -contains 10 -or $chassisTypes -contains 14 -or $chassisTypes -contains 11
if ($isLaptop) { Write-INFO "Chassis: Laptop" } else { Write-INFO "Chassis: Desktop/Other" }

 $cpu       = Get-CimInstance Win32_Processor | Select-Object -First 1
 $cpuName   = $cpu.Name.Trim()
 $cpuCores  = $cpu.NumberOfCores
 $cpuThread = $cpu.NumberOfLogicalProcessors
 $cpuResult = if ($cpu.Status -eq "OK") { "PASS" } else { "FAIL" }
if ($cpuResult -eq "PASS") { Write-OK "CPU: $cpuName ($cpuCores C / $cpuThread T)" } else { Write-FAIL "CPU: $cpuName - Status: $($cpu.Status)" }

 $ramModules = Get-CimInstance Win32_PhysicalMemory
 $ramSlotsUsed = $ramModules.Count
 $totalRAMGB = [math]::Round(($ramModules | Measure-Object Capacity -Sum).Sum / 1GB, 1)
 $ramSpeed = ($ramModules | Select-Object -First 1).Speed
 $memArrays = Get-CimInstance Win32_PhysicalMemoryArray
 $totalSlots = 0
foreach ($arr in $memArrays) { $totalSlots += $arr.MemoryDevices }
 $ramSlotsFree = $totalSlots - $ramSlotsUsed
 $ramDetailsList = @()
foreach ($mod in $ramModules) {
    $modSize = [math]::Round($mod.Capacity / 1GB)
    $modModel = if ($mod.PartNumber) { $mod.PartNumber.Trim() } else { "Unknown Model" }
    $modMfr = if ($mod.Manufacturer) { $mod.Manufacturer.Trim() } else { "Unknown" }
    $ramDetailsList += "$modMfr $modModel ($modSize GB DDR$modSpeed)"
}
 $ramDetailStr = $ramDetailsList -join " | "
 $ramSummaryStr = "${totalRAMGB}GB ($ramSlotsUsed Used / $ramSlotsFree Free Slots)"
 $ramResult = if ($totalRAMGB -gt 0) { "PASS" } else { "FAIL" }
if ($ramResult -eq "PASS") { Write-OK "RAM: $ramSummaryStr"; Write-INFO "Sticks: $ramDetailStr" } else { Write-FAIL "RAM: No memory detected" }

 $diskDrives = Get-CimInstance Win32_DiskDrive
 $storageDetails = @()
 $storageInterfaces = @()
 $storageResult = "PASS"
foreach ($d in $diskDrives) {
    $sz = Format-Bytes $d.Size
    $type = if ($d.MediaType -match "SSD|Solid State") { "SSD" } else { "HDD" }
    $interface = $d.InterfaceType
    if ($interface -eq "SCSI" -and $d.Model -match "NVMe|nvm") { $interface = "NVMe" }
    $model = $d.Model.Trim()
    $storageDetails += "$model - $sz $interface $type"
    $storageInterfaces += $interface
}
 $inferredSlotsStr = "Installed: $($diskDrives.Count)"
if ($storageInterfaces -contains "NVMe") { $inferredSlotsStr += " (M.2 NVMe Slot Active)" }
if ($storageInterfaces -contains "SATA") { $inferredSlotsStr += " (SATA 2.5 Slot Active)" }

 $physDisks = Get-PhysicalDisk -ErrorAction SilentlyContinue
 $storageHealthInfo = ""
foreach ($pd in $physDisks) {
    if ($pd.HealthStatus -ne "Healthy") { $storageResult = "FAIL" }
    $storageHealthInfo += "$($pd.FriendlyName) [$($pd.MediaType)] Health: $($pd.HealthStatus)`n"
    $rel = Get-StorageReliabilityCounter -PhysicalDisk $pd -ErrorAction SilentlyContinue
    if ($rel) {
        $wear = $rel.Wear
        if ($wear -ge 0 -and $wear -le 100) {
            $storageHealthInfo += "  Wear: $wear%`n"
            if ($wear -gt 90) { $storageResult = "FAIL" }
        }
    }
}
if ($storageResult -eq "PASS") { Write-OK "Storage: $inferredSlotsStr"; Write-INFO "Drives: $($storageDetails -join ', ')"; if ($storageHealthInfo) { Write-INFO "Storage Health:`n$($storageHealthInfo.Trim())" } } else { Write-FAIL "Storage: Health issues detected"; if ($storageHealthInfo) { Write-Host "  $storageHealthInfo" -ForegroundColor DarkRed } }

 $gpu       = Get-CimInstance Win32_VideoController | Select-Object -First 1
 $gpuName   = $gpu.Name.Trim()
 $gpuVRAMMB = [math]::Round($gpu.AdapterRAM / 1MB)
 $gpuResult = if ($gpu.Status -eq "OK") { "PASS" } else { "FAIL" }
if ($gpuResult -eq "PASS") { Write-OK "GPU: $gpuName (${gpuVRAMMB}MB)" } else { Write-FAIL "GPU: $gpuName - Status: $($gpu.Status)" }

 $dispRes   = "$($gpu.CurrentHorizontalResolution)x$($gpu.CurrentVerticalResolution)"
 $dispResResult = if ([int]$gpu.CurrentHorizontalResolution -ge 1280) { "PASS" } else { "FAIL" }
if ($dispResResult -eq "PASS") { Write-OK "Display Resolution: $dispRes" } else { Write-FAIL "Display Resolution: $dispRes" }

 $batteryHealthPct = $null
 $batteryChargePct = $null
 $batteryResult = "N/A"
 $batteryDetail = ""
 $batName = "Unknown"; $batMfr = "Unknown"; $batSerial = "Unknown"
 $batChemistry = "Unknown"; $batDesignCap = "Unknown"; $batFullChargeCap = "Unknown"; $batCycleCount = "Unknown"

if ($isLaptop) {
    $bat = Get-CimInstance Win32_Battery -ErrorAction SilentlyContinue
    if ($bat) {
        $batteryChargePct = $bat.EstimatedChargeRemaining
        $batName = if ($bat.Name) { $bat.Name } else { "Unknown" }
        $batChemistry = switch ($bat.Chemistry) { 2 {"Lithium-Ion"} 3 {"Lead Acid"} 4 {"Nickel Cadmium"} 5 {"Nickel Metal Hydride"} 6 {"Lithium-Ion Polymer"} default {"Unknown"} }
        try {
            $ds = Get-CimInstance -ClassName BatteryStaticData -Namespace root\wmi -ErrorAction Stop
            if ($ds) {
                if ($ds.ManufactureName) { $batMfr = $ds.ManufactureName.Trim() }
                if ($ds.UniqueID) { $batSerial = $ds.UniqueID.Trim() }
                if ($ds.Chemistry) { $batChemistry = $ds.Chemistry.Trim() }
                if ($ds.DesignedCapacity -gt 0) { $batDesignCap = "$($ds.DesignedCapacity) mWh" }
            }
        } catch {}
        try {
            $fc = Get-CimInstance -ClassName BatteryFullChargedCapacity -Namespace root\wmi -ErrorAction Stop
            if ($fc -and $fc.FullChargedCapacity -gt 0) { $batFullChargeCap = "$($fc.FullChargedCapacity) mWh" }
        } catch {}
        try {
            $bcc = Get-CimInstance -ClassName BatteryCycleCount -Namespace root\wmi -ErrorAction Stop
            if ($bcc) { $batCycleCount = "$($bcc.CycleCount)" }
        } catch {}
        try {
            if ($ds.DesignedCapacity -gt 0 -and $fc.FullChargedCapacity -gt 0) { $batteryHealthPct = [math]::Round(($fc.FullChargedCapacity / $ds.DesignedCapacity) * 100) }
        } catch {}
        if ($null -eq $batteryHealthPct) { $batteryHealthPct = $batteryChargePct }
        $batteryDetail = "Design: $batDesignCap | Full: $batFullChargeCap | Cycles: $batCycleCount | Health: ${batteryHealthPct}%"
        $batteryResult = if ($batteryHealthPct -ge 30) { "PASS" } else { "FAIL" }
    } else { $batteryResult = "N/A"; $batteryDetail = "No battery detected" }
}
if ($batteryResult -eq "PASS") { Write-OK "Battery: $batName"; Write-INFO "Mfr: $batMfr | Chem: $batChemistry"; Write-INFO "Design Cap: $batDesignCap | Full Cap: $batFullChargeCap"; Write-INFO "Cycles: $batCycleCount | Charge: ${batteryChargePct}% | Health: ${batteryHealthPct}%" }
elseif ($batteryResult -eq "FAIL") { Write-FAIL "Battery: $batteryDetail" } else { Write-NA "Battery: $batteryDetail" }

 $lic = Get-CimInstance SoftwareLicensingProduct | Where-Object { $_.PartialProductKey -and $_.LicenseStatus }
 $winActResult = if ($lic -and $lic.LicenseStatus -contains 1) { "PASS" } else { "FAIL" }
if ($winActResult -eq "PASS") { Write-OK "Windows Activation: Activated" } else { Write-FAIL "Windows Activation: Not activated" }

 $tpmResult = "N/A"; $tpmDetail = ""
try { $tpm = Get-Tpm -ErrorAction Stop; if ($tpm.TpmPresent) { $tpmReadyStr = if ($tpm.TpmReady) { 'Ready' } else { 'Not Ready' }; $tpmDetail = "TPM $($tpm.TpmVersion) - $tpmReadyStr"; $tpmResult = if ($tpm.TpmReady) { "PASS" } else { "FAIL" } } else { $tpmDetail = "TPM not present" } } catch { $tpmDetail = "TPM check unavailable" }
if ($tpmResult -eq "PASS") { Write-OK $tpmDetail } elseif ($tpmResult -eq "FAIL") { Write-FAIL $tpmDetail } else { Write-NA $tpmDetail }

 $sbResult = "N/A"; $sbDetail = ""
try { $sb = Confirm-SecureBootUEFI -ErrorAction Stop; $sbResult = if ($sb) { "PASS" } else { "FAIL" }; $sbStateStr = if ($sb) { 'Enabled' } else { 'Disabled' }; $sbDetail = "Secure Boot: $sbStateStr" } catch { $sbDetail = "Secure Boot: Check unavailable (non-UEFI?)" }
if ($sbResult -eq "PASS") { Write-OK $sbDetail } elseif ($sbResult -eq "FAIL") { Write-FAIL $sbDetail } else { Write-NA $sbDetail }

 $wifiResult = "N/A"; $wifiDetail = ""
 $wifiAdapters = Get-NetAdapter | Where-Object { $_.InterfaceDescription -match "Wi-Fi|Wireless|WLAN|802.11|Qualcomm|Intel.*Wi" }
if ($wifiAdapters) { $wifiDetail = ($wifiAdapters | ForEach-Object { $_.Name }) -join ", "; $wifiResult = "PASS" } else { $wifiDetail = "No Wi-Fi adapter found"; $wifiResult = "FAIL" }
if ($wifiResult -eq "PASS") { Write-OK "Wi-Fi: $wifiDetail" } else { Write-FAIL "Wi-Fi: $wifiDetail" }

 $btResult = "N/A"; $btDetail = ""
 $btDevices = Get-PnpDevice -Class Bluetooth -ErrorAction SilentlyContinue | Where-Object { $_.Status -eq "OK" }
if ($btDevices) { $btDetail = ($btDevices | ForEach-Object { $_.FriendlyName }) -join ", "; $btResult = "PASS" } else { $btDetail = "No Bluetooth device found"; $btResult = "FAIL" }
if ($btResult -eq "PASS") { Write-OK "Bluetooth: $btDetail" } else { Write-FAIL "Bluetooth: $btDetail" }

 $biosVer = $biosInfo.SMBIOSBIOSVersion; $biosMfr = $biosInfo.Manufacturer; $biosDate = $biosInfo.ReleaseDate.ToString("yyyy-MM-dd")
Write-INFO "BIOS: $biosMfr $biosVer ($biosDate)"

# -- Part 2: Technician Manual Tests --
Write-Section "PART 2 - Technician Manual Tests"

 $kbResult = "FAIL"
Write-INFO "Launching keyboard tester..."
 $kbHtml = @'
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Keyboard Tester - CCTech</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}body{background:#0d0d1a;color:#ccc;font-family:'Segoe UI',sans-serif;padding:20px;min-height:100vh}h1{text-align:center;color:#00e676;font-size:22px;margin-bottom:6px}p.sub{text-align:center;color:#666;font-size:13px;margin-bottom:20px}.stats{display:flex;justify-content:center;gap:30px;margin-bottom:20px}.stat{text-align:center}.stat .num{font-size:36px;font-weight:900;color:#00e676}.stat .lbl{font-size:11px;color:#666;text-transform:uppercase;letter-spacing:1px}.kb{display:flex;flex-direction:column;gap:4px;align-items:center}.row{display:flex;gap:4px}.key{width:42px;height:42px;background:#1a1a2e;color:#777;border:1px solid #333;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:10px;font-family:monospace;transition:all .08s;user-select:none}.key.hit{background:#00e676;color:#000;border-color:#00e676;transform:scale(.93);box-shadow:0 0 12px #00e67666}.key.w2{width:62px}.key.w3{width:82px}.key.w4{width:100px}.key.w6{width:130px}.key.sp{width:260px}.nav{display:flex;flex-direction:column;gap:4px;margin-left:20px}.close-btn{display:block;margin:20px auto 0;padding:10px 30px;background:#00e676;color:#000;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer}.close-btn:hover{background:#00c853}
</style></head><body>
<h1>Keyboard Tester</h1><p class="sub">Press every key. Highlighted keys have been detected. Close this window when done.</p>
<div class="stats"><div class="stat"><div class="num" id="cnt">0</div><div class="lbl">Keys Pressed</div></div><div class="stat"><div class="num" id="tot">0</div><div class="lbl">Total Keys</div></div></div>
<div style="display:flex;justify-content:center;gap:20px"><div class="kb" id="main"></div><div class="nav" id="nav"></div></div>
<button class="close-btn" onclick="window.close()">Close Window</button>
<script>
const L={Escape:'Esc',Backquote:'`',Minus:'-',Equal:'=',Backspace:'Bksp',Tab:'Tab',BracketLeft:'[',BracketRight:']',Backslash:'\\',CapsLock:'Caps',Semicolon:';',Quote:"'",Enter:'Enter',ShiftLeft:'Shift',Comma:',',Period:'.',Slash:'/',ShiftRight:'Shift',ControlLeft:'Ctrl',MetaLeft:'Win',AltLeft:'Alt',Space:'Space',AltRight:'Alt',MetaRight:'Win',ContextMenu:'Menu',ControlRight:'Ctrl',ArrowUp:'Up',ArrowDown:'Dn',ArrowLeft:'Lt',ArrowRight:'Rt',Delete:'Del',Insert:'Ins',Home:'Home',End:'End',PageUp:'PgUp',PageDown:'PgDn',Numpad0:'0',Numpad1:'1',Numpad2:'2',Numpad3:'3',Numpad4:'4',Numpad5:'5',Numpad6:'6',Numpad7:'7',Numpad8:'8',Numpad9:'9',NumpadAdd:'+',NumpadSubtract:'-',NumpadMultiply:'*',NumpadDivide:'/',NumpadDecimal:'.',NumpadEnter:'Ent',NumLock:'Num'};
function lb(c){if(L[c])return L[c];if(c.startsWith('Key'))return c.slice(3);if(c.startsWith('Digit'))return c.slice(5);return c}
function wc(c){const w={Backspace:'w4',Tab:'w3',CapsLock:'w4',Enter:'w4',ShiftLeft:'w4',ShiftRight:'w6',Backslash:'w2',Space:'sp',ControlLeft:'w2',ControlRight:'w2',AltLeft:'w2',AltRight:'w2',MetaLeft:'w2',MetaRight:'w2',ContextMenu:'w2',NumpadEnter:'w3',NumpadAdd:'w2',NumpadSubtract:'w2',NumpadMultiply:'w2',NumpadDivide:'w2'};return w[c]||''}
const rows=[['Escape','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'],['Backquote','Digit1','Digit2','Digit3','Digit4','Digit5','Digit6','Digit7','Digit8','Digit9','Digit0','Minus','Equal','Backspace'],['Tab','KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','Backslash'],['CapsLock','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','Enter'],['ShiftLeft','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period','Slash','ShiftRight'],['ControlLeft','MetaLeft','AltLeft','Space','AltRight','MetaRight','ContextMenu','ControlRight']];
const nav=[['PrintScreen','ScrollLock','Pause'],['Insert','Home','PageUp'],['Delete','End','PageDown'],['','','ArrowUp'],['','ArrowLeft','','ArrowRight',''],['','ArrowDown','']];
const nump=[['NumLock','NumpadDivide','NumpadMultiply','NumpadSubtract'],['Numpad7','Numpad8','Numpad9','NumpadAdd'],['Numpad4','Numpad5','Numpad6',''],['Numpad1','Numpad2','Numpad3','NumpadEnter'],['Numpad0','','NumpadDecimal','']];
const pressed=new Set();let total=0;
function mk(keys,container){keys.forEach(r=>{const rd=document.createElement('div');rd.className='row';r.forEach(c=>{if(!c)return;total++;const k=document.createElement('div');k.className='key '+wc(c);k.id='k-'+c;k.textContent=lb(c);rd.appendChild(k)});container.appendChild(rd)})}
const main=document.getElementById('main');mk(rows,main);const navE=document.getElementById('nav');mk(nav,navE);const np=document.createElement('div');np.className='kb';np.style.marginLeft='20px';mk(nump,np);main.parentNode.appendChild(np);document.getElementById('tot').textContent=total;
document.addEventListener('keydown',e=>{e.preventDefault();const c=e.code;if(!pressed.has(c)){pressed.add(c);const el=document.getElementById('k-'+c);if(el)el.classList.add('hit');document.getElementById('cnt').textContent=pressed.size}});
</script></body></html>
'@
 $kbPath = "$TempDir\keyboard_test.html"
Set-Content -Path $kbPath -Value $kbHtml -Encoding UTF8
Start-Process $kbPath
 $kbResult = if (Ask-YesNo "Are ALL keys working?" -DefaultYes) { "PASS" } else { "FAIL" }
if ($kbResult -eq "PASS") { Write-OK "Keyboard" } else { Write-FAIL "Keyboard" }

 $deadPixels = $false; $backlightBleed = $false; $flickering = $false
Write-INFO "Launching display color test..."
 $dispHtml = @'
<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Display Test - CCTech</title>
<style>*{margin:0;padding:0}body{overflow:hidden;cursor:none;background:#000}.s{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;font-family:'Segoe UI',sans-serif;transition:background .2s}.hint{font-size:16px;opacity:.15;pointer-events:none}</style></head><body>
<div class="s" id="s" style="background:#fff;color:#000"><div class="hint">SPACE / Click = Next | ESC = Close</div></div>
<script>
const C=[{b:'#ffffff',c:'#000',l:'White'},{b:'#000000',c:'#fff',l:'Black'},{b:'#ff0000',c:'#fff',l:'Red'},{b:'#00ff00',c:'#000',l:'Green'},{b:'#0000ff',c:'#fff',l:'Blue'},{b:'#1a1a2e',c:'#00e676',l:'TEST COMPLETE - Press ESC to close'}];
let i=0;const s=document.getElementById('s');function nxt(){i=(i+1)%C.length;s.style.background=C[i].b;s.style.color=C[i].c;s.innerHTML='<div class="hint">SPACE / Click = Next | ESC = Close<br><br>'+C[i].l+'</div>'}
document.addEventListener('keydown',e=>{if(e.code==='Space')nxt();if(e.code==='Escape')window.close()});document.addEventListener('click',nxt);
</script></body></html>
'@
 $dispPath = "$TempDir\display_test.html"
Set-Content -Path $dispPath -Value $dispHtml -Encoding UTF8
Start-Process $dispPath
Write-INFO "Check the display for issues on each color screen."
 $deadPixels     = -not (Ask-YesNo "Any dead pixels?")
 $backlightBleed = -not (Ask-YesNo "Any backlight bleed?")
 $flickering     = -not (Ask-YesNo "Any flickering?")
 $dispTestResult = if ($deadPixels -and $backlightBleed -and $flickering) { "PASS" } else { "FAIL" }
if ($dispTestResult -eq "PASS") { Write-OK "Display: No issues" } else { Write-FAIL "Display: Issues detected"; if (-not $deadPixels) { Write-Host "       - Dead pixels found" -ForegroundColor Red }; if (-not $backlightBleed) { Write-Host "       - Backlight bleed detected" -ForegroundColor Red }; if (-not $flickering) { Write-Host "       - Flickering detected" -ForegroundColor Red } }

 $camResult = "FAIL"
Write-INFO "Opening Windows Camera..."
Start-Process "microsoft.windows.camera:"
Start-Sleep -Seconds 2
 $camResult = if (Ask-YesNo "Is the camera working?") { "PASS" } else { "FAIL" }
if ($camResult -eq "PASS") { Write-OK "Camera" } else { Write-FAIL "Camera" }

 $micResult = "FAIL"
Write-INFO "Opening Sound Recorder app - Please record 5 seconds, play it back, and listen."
Start-Process "ms-windows-soundrecorder:"
Start-Sleep -Seconds 2
 $micResult = if (Ask-YesNo "Is the microphone working (heard playback)?") { "PASS" } else { "FAIL" }
if ($micResult -eq "PASS") { Write-OK "Microphone" } else { Write-FAIL "Microphone" }

 $spkLeftResult = "FAIL"; $spkRightResult = "FAIL"
 $soundFile = "$env:SystemRoot\Media\chimes.wav"
if (Test-Path $soundFile) { Write-INFO "Playing test sound..."; try { $player = New-Object System.Media.SoundPlayer $soundFile; $player.PlaySync() } catch { Write-Host "       (Could not play sound - answer manually)" -ForegroundColor DarkYellow } } else { Write-INFO "Test sound not found - answer manually" }
 $spkLeftResult  = if (Ask-YesNo "Left speaker OK?") { "PASS" } else { "FAIL" }
 $spkRightResult = if (Ask-YesNo "Right speaker OK?") { "PASS" } else { "FAIL" }
 $spkResult = if ($spkLeftResult -eq "PASS" -and $spkRightResult -eq "PASS") { "PASS" } else { "FAIL" }
if ($spkResult -eq "PASS") { Write-OK "Speakers: L+R OK" } else { Write-FAIL "Speakers: L=$spkLeftResult R=$spkRightResult" }

 $tpResult = "N/A"
if ($isLaptop) { Write-INFO "Test touchpad: move cursor, left click, right click, scroll, gestures."; $tpResult = if (Ask-YesNo "Touchpad - everything OK?") { "PASS" } else { "FAIL" }; if ($tpResult -eq "PASS") { Write-OK "Touchpad" } else { Write-FAIL "Touchpad" } } else { Write-NA "Touchpad: Not a laptop" }

 $fpResult = "N/A"
 $fpDevice = Get-PnpDevice | Where-Object { $_.FriendlyName -match "fingerprint|biometric|finger print" -and $_.Status -eq "OK" }
if ($fpDevice) { Write-INFO "Fingerprint sensor detected: $($fpDevice.FriendlyName)"; $fpResult = if (Ask-YesNo "Fingerprint reader working?") { "PASS" } else { "FAIL" } } else { Write-NA "Fingerprint: Not Available" }
if ($fpResult -eq "PASS") { Write-OK "Fingerprint" } elseif ($fpResult -eq "FAIL") { Write-FAIL "Fingerprint" }

Write-INFO "Insert a USB drive into any port."
 $usbResult = if (Ask-YesNo "USB drive detected?") { "PASS" } else { "FAIL" }
if ($usbResult -eq "PASS") { Write-OK "USB" } else { Write-FAIL "USB" }

Write-INFO "Connect an external monitor via HDMI."
 $hdmiResult = if (Ask-YesNo "External display working?") { "PASS" } else { "FAIL" }
if ($hdmiResult -eq "PASS") { Write-OK "HDMI" } else { Write-FAIL "HDMI" }

 $chargeResult = "N/A"
if ($isLaptop) { Write-INFO "Connect the power adapter."; $adapterDetected = Ask-YesNo "Adapter detected?" -DefaultYes; $isCharging = Ask-YesNo "Battery charging?" -DefaultYes; $chargeResult = if ($adapterDetected -and $isCharging) { "PASS" } else { "FAIL" }; if ($chargeResult -eq "PASS") { Write-OK "Charging" } else { Write-FAIL "Charging" } } else { Write-NA "Charging: Not a laptop" }

# -- Remarks (Moved to end for physical damages) --
Write-Section "Physical Inspection & Remarks"
Write-INFO "Please inspect the laptop body for scratches, dents, or cracks."
 $RemarksInput = Read-Host "  Enter Remarks (Physical damages, other details)"
if ([string]::IsNullOrWhiteSpace($RemarksInput)) { $RemarksInput = "None" }

# -- Part 3: Grade Calculation --
Write-Section "Calculating Results"
 $allTests = [ordered]@{ "CPU"=$cpuResult; "RAM"=$ramResult; "Storage"=$storageResult; "Battery"=$batteryResult; "Graphics"=$gpuResult; "Display"=$dispTestResult; "Keyboard"=$kbResult; "Touchpad"=$tpResult; "Camera"=$camResult; "Microphone"=$micResult; "Speakers"=$spkResult; "Fingerprint"=$fpResult; "Wi-Fi"=$wifiResult; "Bluetooth"=$btResult; "USB"=$usbResult; "HDMI"=$hdmiResult; "Charging"=$chargeResult }
 $passCount = ($allTests.Values | Where-Object { $_ -eq "PASS" }).Count
 $failCount = ($allTests.Values | Where-Object { $_ -eq "FAIL" }).Count
 $naCount   = ($allTests.Values | Where-Object { $_ -eq "N/A"  }).Count
 $totalTested = $passCount + $failCount
 $criticalFail = ($cpuResult -eq "FAIL") -or ($ramResult -eq "FAIL") -or ($storageResult -eq "FAIL")
if ($criticalFail) { $overallGrade = "F" } elseif ($failCount -eq 0) { $overallGrade = "A" } elseif ($failCount -le 1) { $overallGrade = "B" } elseif ($failCount -le 2) { $overallGrade = "C" } elseif ($failCount -le 4) { $overallGrade = "D" } else { $overallGrade = "F" }
 $gradeColors = @{ A="Green"; B="Cyan"; C="Yellow"; D="DarkYellow"; F="Red" }
Write-Host ""
Write-Host "  Overall Grade : " -NoNewline; Write-Host $overallGrade -ForegroundColor $gradeColors[$overallGrade]
Write-Host "  Passed : $passCount / $totalTested" -ForegroundColor Green
Write-Host "  Failed : $failCount / $totalTested" -ForegroundColor Red
Write-Host "  N/A    : $naCount" -ForegroundColor DarkGray

# -- Part 4: Report Generation --
Write-Section "Generating Reports"
 $baseName = "${Mfr}_${Model}_$FileStamp" -replace '[\\/:*?"<>|]', '_'
 $htmlFile = "$ReportDir\$baseName.html"
 $csvFile  = "$ReportDir\$baseName.csv"
 $jsonFile = "$ReportDir\$baseName.json"
 $pdfFile  = "$ReportDir\$baseName.pdf"

 $tableRowsHtml = ""; $detailRowsHtml = ""
foreach ($item in $allTests.GetEnumerator()) {
    $bc = Get-BadgeClass $item.Value; $badge = Get-PassFailBadge $item.Value; $detail = ""
    switch ($item.Key) {
        "Battery"  { $detail = "Design: $batDesignCap | Full: $batFullChargeCap | Cycles: $batCycleCount | Health: ${batteryHealthPct}%" }
        "Display"  { $issues = @(); if (-not $deadPixels) { $issues += "Dead pixels" }; if (-not $backlightBleed) { $issues += "Backlight bleed" }; if (-not $flickering) { $issues += "Flickering" }; $detail = if ($issues.Count -gt 0) { $issues -join ", " } else { "$dispRes - No issues" } }
        "Speakers" { $detail = "L: $spkLeftResult | R: $spkRightResult" }
        "CPU"      { $detail = "$cpuName ($cpuCores C / $cpuThread T)" }
        "RAM"      { $detail = "$ramSummaryStr - $ramDetailStr" }
        "Storage"  { $detail = $storageDetails -join [Environment]::NewLine }
        "Graphics" { $detail = "$gpuName (${gpuVRAMMB}MB)" }
        default    { $detail = $badge }
    }
    $tableRowsHtml += "  <tr><td>$($item.Key)</td><td><span class=`"badge $bc`">$badge</span></td></tr>`n"
    $detailHtml = [System.Net.WebUtility]::HtmlEncode([string]$detail).Replace([Environment]::NewLine, "<br>")
    $detailRowsHtml += "  <tr><td>$($item.Key)</td><td>$detailHtml</td></tr>`n"
}

 $gradeClass = "grade-$($overallGrade.ToLower())"
 $winStatusStr = if ($winActResult -eq 'PASS') { 'Activated' } else { 'Not Activated' }
 $tpmSpecStr = if ($tpmDetail) { $tpmDetail } else { 'N/A' }
 $sbSpecStr = if ($sbDetail) { $sbDetail } else { 'N/A' }
 $chassisStr = if ($isLaptop) { "Laptop" } else { "Desktop/Other" }
 $gradeColorHex = if($overallGrade -eq 'A'){'#00c853'}elseif($overallGrade -eq 'B'){'#2196f3'}elseif($overallGrade -eq 'C'){'#ff9800'}else{'#f44336'}
 $cycColorHex = if([int]$batCycleCount -gt 500){'#b71c1c'}else{'#1b5e20'}
 $hpColorHex = if($batteryHealthPct -ge 60){'#1b5e20'}else{'#b71c1c'}
function ConvertTo-HtmlText { param([AllowNull()][object]$Value) [System.Net.WebUtility]::HtmlEncode([string]$Value) }

 $htmlReport = @"
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>CCTech IT Solutions - $(ConvertTo-HtmlText $Serial)</title>
<style>
@page{size:A4;margin:12mm}@media print{.no-print{display:none!important}body{background:#fff!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}.report{box-shadow:none!important;max-width:100%!important;padding:20px!important}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Tahoma,sans-serif;background:#e8e8e8;color:#222;line-height:1.5}
.report{max-width:820px;margin:30px auto;background:#fff;padding:45px;box-shadow:0 4px 24px rgba(0,0,0,.12);border-radius:4px}
.header{display:flex;align-items:center;justify-content:space-between;border-bottom:3px solid #00c853;padding-bottom:18px;margin-bottom:28px}
.brand{display:flex;align-items:center;gap:16px}.brand-icon{width:52px;height:52px;background:#1a1a2e;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#00e676;font-size:22px;font-weight:900}.brand-text h1{font-size:22px;font-weight:800;color:#1a1a2e;line-height:1.1}.brand-text p{font-size:11px;color:#888;letter-spacing:2px;text-transform:uppercase}
.qr-box{text-align:center;min-width:120px}.local-badge{display:inline-block;padding:9px 12px;border:1px solid #b8e5ca;border-radius:9px;background:#edf9f1;color:#176b36;font-size:10px;font-weight:800;letter-spacing:1px}.qr-box span+span{font-size:10px;color:#888;display:block;margin-top:6px}
.info-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:24px}.info-card{background:#f7f8fa;border-radius:8px;padding:12px 14px;border-left:3px solid #00c853}.info-card .label{font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:#999;margin-bottom:3px}.info-card .value{font-size:14px;font-weight:700;color:#1a1a2e}.info-card .value.small{font-size:12px;font-weight:600}
.specs{background:#f7f8fa;border-radius:8px;padding:18px 20px;margin-bottom:24px}.specs h3{font-size:13px;text-transform:uppercase;letter-spacing:1.5px;color:#888;margin-bottom:12px}.specs-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px}.spec-row{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #eee;font-size:13px}.spec-row .k{color:#666}.spec-row .v{font-weight:600;color:#1a1a2e;text-align:right;max-width:60%;word-break:break-word}
.bat-box{grid-column:1/-1;background:#fff;border:1px solid #ddd;border-radius:8px;padding:12px 16px;margin-top:5px}.bat-box h4{font-size:12px;color:#1a1a2e;margin-bottom:8px;border-bottom:1px solid #eee;padding-bottom:4px}.bat-info{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px 15px;font-size:12px}.bat-info .bl{color:#888}.bat-info .bv{font-weight:600;color:#1a1a2e;text-align:right}
.tables-wrap{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px}.tbl-card{border:1px solid #e8e8e8;border-radius:8px;overflow:hidden}.tbl-card h3{font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#fff;background:#1a1a2e;padding:10px 14px}.tbl-card table{width:100%;border-collapse:collapse}.tbl-card td{padding:8px 14px;font-size:13px;border-bottom:1px solid #f0f0f0}.tbl-card tr:last-child td{border-bottom:none}.tbl-card tr:nth-child(even){background:#fafafa}
.badge{display:inline-block;padding:3px 14px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:.8px;text-transform:uppercase}.badge-pass{background:#e8f5e9;color:#1b5e20}.badge-fail{background:#ffebee;color:#b71c1c}.badge-na{background:#f5f5f5;color:#999}
.grade-section{text-align:center;margin:28px 0}.grade-label{font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#999;margin-bottom:4px}.grade-letter{font-size:80px;font-weight:900;line-height:1}.grade-a{color:#00c853}.grade-b{color:#2196f3}.grade-c{color:#ff9800}.grade-d{color:#ff5722}.grade-f{color:#f44336}.grade-summary{font-size:13px;color:#888;margin-top:6px}
.sigs{display:grid;grid-template-columns:1fr 1fr;gap:50px;margin-top:36px;padding-top:20px;border-top:1px solid #ddd}.sig-box{text-align:center}.sig-line{border-bottom:1.5px solid #333;width:200px;margin:50px auto 6px}.sig-label{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px}
.remarks{margin-top:20px;padding:14px 18px;background:#fffde7;border-left:3px solid #fbc02d;border-radius:0 8px 8px 0;font-size:13px;color:#555}.remarks strong{color:#333}
.footer{text-align:center;margin-top:30px;padding-top:14px;border-top:2px solid #00c853;font-size:10px;color:#bbb;letter-spacing:.5px}
.print-btn{position:fixed;top:20px;right:20px;padding:10px 24px;background:#00c853;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(0,200,83,.3);z-index:999}.print-btn:hover{background:#00a844}
</style></head><body>
<button class="print-btn no-print" onclick="window.print()">Print / Save as PDF</button>
<div class="report">
<div class="header"><div class="brand"><div class="brand-icon">CC</div><div class="brand-text"><h1>$(ConvertTo-HtmlText $Company)</h1><p>Laptop Inspection Report</p></div></div><div class="qr-box"><span class="local-badge">LOCAL REPORT</span><span>Saved on this computer</span></div></div>
<div class="info-grid">
<div class="info-card"><div class="label">Seller / Customer</div><div class="value">$(ConvertTo-HtmlText $CustomerName)</div></div>
<div class="info-card"><div class="label">Date</div><div class="value small">$(ConvertTo-HtmlText $DateStr)</div></div>
<div class="info-card"><div class="label">Technician</div><div class="value">$(ConvertTo-HtmlText $TechnicianName)</div></div>
<div class="info-card"><div class="label">Manufacturer</div><div class="value">$(ConvertTo-HtmlText $Mfr)</div></div>
<div class="info-card"><div class="label">Model</div><div class="value">$(ConvertTo-HtmlText $Model)</div></div>
<div class="info-card"><div class="label">Serial Number</div><div class="value small">$(ConvertTo-HtmlText $Serial)</div></div>
<div class="info-card"><div class="label">Chassis</div><div class="value small">$(ConvertTo-HtmlText $chassisStr)</div></div>
<div class="info-card"><div class="label">Windows</div><div class="value small">$(ConvertTo-HtmlText $winStatusStr)</div></div>
<div class="info-card"><div class="label">Grade</div><div class="value small" style="color:$gradeColorHex">$overallGrade</div></div>
</div>
<div class="specs"><h3>Hardware Specifications</h3><div class="specs-grid">
<div class="spec-row"><span class="k">Processor</span><span class="v">$(ConvertTo-HtmlText $cpuName)</span></div>
<div class="spec-row"><span class="k">Cores / Threads</span><span class="v">$(ConvertTo-HtmlText $cpuCores) C / $(ConvertTo-HtmlText $cpuThread) T</span></div>
<div class="spec-row"><span class="k">Memory Slots</span><span class="v">$(ConvertTo-HtmlText $ramSummaryStr)</span></div>
<div class="spec-row"><span class="k">RAM Stick(s)</span><span class="v">$(ConvertTo-HtmlText $ramDetailStr)</span></div>
<div class="spec-row"><span class="k">Storage Slots</span><span class="v">$(ConvertTo-HtmlText $inferredSlotsStr)</span></div>
<div class="spec-row"><span class="k">Drive(s)</span><span class="v">$(ConvertTo-HtmlText ($storageDetails -join ', '))</span></div>
<div class="spec-row"><span class="k">Graphics</span><span class="v">$(ConvertTo-HtmlText $gpuName)</span></div>
<div class="spec-row"><span class="k">Display</span><span class="v">$(ConvertTo-HtmlText $dispRes)</span></div>
<div class="spec-row"><span class="k">BIOS</span><span class="v">$(ConvertTo-HtmlText "$biosMfr $biosVer")</span></div>
<div class="spec-row"><span class="k">TPM</span><span class="v">$(ConvertTo-HtmlText $tpmSpecStr)</span></div>
<div class="spec-row"><span class="k">Secure Boot</span><span class="v">$(ConvertTo-HtmlText $sbSpecStr)</span></div>
</div>
<div class="bat-box"><h4>Installed Battery Information</h4><div class="bat-info">
<div><span class="bl">Name:</span></div><div><span class="bv">$(ConvertTo-HtmlText $batName)</span></div><div></div>
<div><span class="bl">Manufacturer:</span></div><div><span class="bv">$(ConvertTo-HtmlText $batMfr)</span></div><div></div>
<div><span class="bl">Serial Number:</span></div><div><span class="bv">$(ConvertTo-HtmlText $batSerial)</span></div><div></div>
<div><span class="bl">Chemistry:</span></div><div><span class="bv">$(ConvertTo-HtmlText $batChemistry)</span></div><div></div>
<div><span class="bl">Design Capacity:</span></div><div><span class="bv">$(ConvertTo-HtmlText $batDesignCap)</span></div><div></div>
<div><span class="bl">Full Charge Capacity:</span></div><div><span class="bv">$(ConvertTo-HtmlText $batFullChargeCap)</span></div><div></div>
<div><span class="bl">Cycle Count:</span></div><div><span class="bv" style="color:$cycColorHex">$(ConvertTo-HtmlText $batCycleCount)</span></div><div></div>
<div><span class="bl">Current Charge:</span></div><div><span class="bv">$(ConvertTo-HtmlText $batteryChargePct)%</span></div>
<div><span class="bv" style="color:$hpColorHex;font-size:14px">Health: $(ConvertTo-HtmlText $batteryHealthPct)%</span></div>
</div></div></div>
<div class="tables-wrap"><div class="tbl-card"><h3>Test Results</h3><table>$tableRowsHtml</table></div><div class="tbl-card"><h3>Test Details</h3><table>$detailRowsHtml</table></div></div>
<div class="grade-section"><div class="grade-label">Overall Grade</div><div class="grade-letter $gradeClass">$overallGrade</div><div class="grade-summary">$passCount Passed / $failCount Failed / $naCount N/A</div></div>
<div class="remarks"><strong>Remarks / Physical Damages:</strong> $(ConvertTo-HtmlText $RemarksInput)</div>
<div class="sigs"><div class="sig-box"><div class="sig-line"></div><div class="sig-label">Technician Signature</div></div><div class="sig-box"><div class="sig-line"></div><div class="sig-label">Customer Signature</div></div></div>
<div class="footer">$Company - This report is computer-generated and valid without a stamp. - Page 1 of 1</div>
</div></body></html>
"@
Set-Content -Path $htmlFile -Value $htmlReport -Encoding UTF8
Write-OK "HTML: $htmlFile"

 $csvLines = @("Category,Result,Detail")
foreach ($item in $allTests.GetEnumerator()) {
    $detail = ""
    switch ($item.Key) { "CPU"{$detail="$cpuName"}"RAM"{$detail="$ramSummaryStr - $ramDetailStr"}"Storage"{$detail=$storageDetails -join "; "}"Battery"{$detail="Design: $batDesignCap | Full: $batFullChargeCap | Cycles: $batCycleCount"}"Graphics"{$detail=$gpuName}"Display"{$detail=$dispRes}default{$detail=$item.Value} }
    $csvLines += "$($item.Key),$($item.Value),""$detail"""
}
 $csvLines += ""; $csvLines += "Manufacturer,$Mfr,"; $csvLines += "Model,$Model,"; $csvLines += "Serial,$Serial,"
 $csvLines += "Seller/Customer,""$CustomerName"","; $csvLines += "Technician,""$TechnicianName"","
 $csvLines += "Date,""$DateStr"","; $csvLines += "Grade,$overallGrade,"; $csvLines += "Remarks,""$RemarksInput"","
Set-Content -Path $csvFile -Value ($csvLines -join [Environment]::NewLine) -Encoding UTF8
Write-OK "CSV:  $csvFile"

 $jsonObj = [ordered]@{ company=$Company; reportDate=$DateStr; customer=$CustomerName; technician=$TechnicianName; remarks=$RemarksInput; device=[ordered]@{ manufacturer=$Mfr; model=$Model; serial=$Serial; chassis=$chassisStr }; specifications=[ordered]@{ cpu=$cpuName; cores=$cpuCores; threads=$cpuThread; ramSlotsTotal=$totalSlots; ramSlotsUsed=$ramSlotsUsed; ramSticks=$ramDetailsList; ramTotalGB=$totalRAMGB; storageSlots=$inferredSlotsStr; storageDrives=$storageDetails; gpu=$gpuName; gpuVRAM_MB=$gpuVRAMMB; displayRes=$dispRes; battery=[ordered]@{ name=$batName; manufacturer=$batMfr; serialNumber=$batSerial; chemistry=$batChemistry; designCapacity_mWh=$batDesignCap; fullChargeCap_mWh=$batFullChargeCap; cycleCount=$batCycleCount; currentCharge="$batteryChargePct%"; health="$batteryHealthPct%" }; bios="$biosMfr $biosVer ($biosDate)"; tpm=$tpmDetail; secureBoot=$sbDetail; windowsActivated=($winActResult -eq "PASS") }; testResults=$allTests; grade=$overallGrade; passCount=$passCount; failCount=$failCount; naCount=$naCount }
Set-Content -Path $jsonFile -Value ($jsonObj | ConvertTo-Json -Depth 6) -Encoding UTF8
Write-OK "JSON: $jsonFile"

 $pdfGenerated = $false; $edgeExe = $null
 $edgeCandidates = @("${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe", "${env:ProgramFiles}\Microsoft\Edge\Application\msedge.exe", "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe")
foreach ($c in $edgeCandidates) { if (Test-Path $c) { $edgeExe = $c; break } }
if ($edgeExe) { Write-INFO "Generating PDF via $($edgeExe | Split-Path -Leaf)..."; try { $pdfArgs = "--headless --disable-gpu --disable-extensions --print-to-pdf=`"$pdfFile`" --no-margins `"$htmlFile`""; Start-Process -FilePath $edgeExe -ArgumentList $pdfArgs -Wait -NoNewWindow -ErrorAction Stop | Out-Null; if (Test-Path $pdfFile) { $pdfGenerated = $true; Write-OK "PDF:  $pdfFile" } } catch { Write-Host "  [WARN] PDF generation failed." -ForegroundColor DarkYellow } }
if (-not $pdfGenerated) { Write-Host "  [INFO] PDF not auto-generated. Use Ctrl+P in the HTML report." -ForegroundColor DarkYellow }

Write-Host ""
Write-Host "  +======================================================+" -ForegroundColor Cyan
Write-Host "  |              INSPECTION COMPLETE                     |" -ForegroundColor Cyan
Write-Host "  +======================================================+" -ForegroundColor Cyan
Write-Host "  |  Device  : $Mfr $Model" -ForegroundColor White
Write-Host "  |  Serial  : $Serial" -ForegroundColor White
Write-Host "  |  Grade   : $overallGrade" -ForegroundColor $gradeColors[$overallGrade]
Write-Host "  |  Result  : $passCount Pass / $failCount Fail" -ForegroundColor White
Write-Host "  |  Reports : $ReportDir" -ForegroundColor DarkGray
Write-Host "  +======================================================+" -ForegroundColor Cyan
Write-Host ""

Start-Process $htmlFile
Start-Process -FilePath explorer.exe -ArgumentList "`"$ReportDir`""
$whatsAppMessage = @"
Hi CCTech IT Solutions, I have completed a laptop inspection.
Customer: $CustomerName
Device: $Mfr $Model
Serial: $Serial
Grade: $overallGrade
Results: $passCount passed, $failCount failed, $naCount not applicable
Local report folder: $ReportDir
I will attach the generated report file in this chat.
"@
$whatsAppUrl = "https://wa.me/916364253615?text=$([Uri]::EscapeDataString($whatsAppMessage))"
Write-INFO "WhatsApp will open with a draft summary. Review it and press Send; attach the PDF or HTML report from the report folder."
try { Start-Process -FilePath $whatsAppUrl } catch { Write-Host "  [WARN] Could not open WhatsApp automatically. The report is saved locally." -ForegroundColor DarkYellow }
Remove-Item -LiteralPath $TempDir -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "  Press any key to exit..." -ForegroundColor DarkGray
 $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
