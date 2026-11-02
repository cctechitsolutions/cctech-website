(() => {
  'use strict';

  const STORE_KEY = 'cctech_laptop_inspections_v1';
  const PHYSICAL_ITEMS = ['Front body','Rear cover','Display bezel','Hinges','Keyboard','Touchpad','Palm rest','Bottom panel','Screws','Charging connector','USB-A ports','USB-C / Thunderbolt ports','HDMI / DisplayPort','Audio jack','Speakers','Camera','Screen','Liquid damage indicators'];
  const state = { record: null, keyCodes: new Set(), stream: null, mediaRecorder: null, audioChunks: [], toastTimer: 0, colorIndex: 0 };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const randomId = () => window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,12)}`;

  function newRecord() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replaceAll('-', '');
    return { id: `CCI-${date}-${randomId().slice(0, 6).toUpperCase()}`, createdAt: now.toISOString(), updatedAt: now.toISOString(), customer: {}, device: {}, browserFacts: {}, checks: [], physical: {}, confirmation: false, confirmationName: '' };
  }
  function safeRead() {
    try { const value = JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); return Array.isArray(value) ? value.filter(r => r && typeof r.id === 'string') : []; }
    catch { return []; }
  }
  function safeWrite(records) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(records)); return true; }
    catch { toast('Could not save: browser storage may be full or disabled. Export a copy instead.'); return false; }
  }
  function init() {
    state.record = newRecord();
    $('#year').textContent = new Date().getFullYear();
    renderPhysical(); renderRecord(); renderSaved(); renderSummary();
    $$('.inspector-tab').forEach(tab => tab.addEventListener('click', () => showView(tab.dataset.view)));
    $$('[data-go]').forEach(button => button.addEventListener('click', () => showView(button.dataset.go)));
    $('#newInspection').addEventListener('click', resetRecord);
    $('#detectDevice').addEventListener('click', collectBrowserFacts);
    $('#inspectionForm').addEventListener('input', syncForm);
    $('#inspectionForm').addEventListener('change', syncForm);
    $('#addCheck').addEventListener('click', addCheck);
    $('#openKeyboard').addEventListener('click', openKeyboard);
    $('#finishKeyboard').addEventListener('click', finishKeyboard);
    $('#openDisplay').addEventListener('click', openDisplay);
    $('#openCamera').addEventListener('click', cameraTest);
    $('#recordMic').addEventListener('click', microphoneTest);
    $('#playTone').addEventListener('click', speakerTest);
    $('#saveRecord').addEventListener('click', saveRecord);
    $('#exportHtml').addEventListener('click', () => download('html'));
    $('#exportJson').addEventListener('click', () => download('json'));
    $('#exportCsv').addEventListener('click', () => download('csv'));
    $('#printReport').addEventListener('click', printReport);
    $('#recordSearch').addEventListener('input', renderSaved);
    $('#physicalRows').addEventListener('input', syncPhysical);
    $('#physicalRows').addEventListener('change', syncPhysical);
    $('#customerConfirm').addEventListener('change', () => { state.record.confirmation = $('#customerConfirm').checked; });
    $('#customerSignature').addEventListener('input', () => { state.record.confirmationName = $('#customerSignature').value; });
    $('#diagnosticResults').addEventListener('click', deleteCheck);
    $('#savedRecords').addEventListener('click', savedAction);
    $$('[data-close]').forEach(button => button.addEventListener('click', () => closeOverlay(button.dataset.close)));
    $('#keyboardOverlay').addEventListener('click', e => { if (e.target.id === 'keyboardOverlay') closeOverlay('keyboardOverlay'); });
    document.addEventListener('keydown', handleGlobalKey);
    $('#displayOverlay').addEventListener('click', advanceDisplay);
    window.addEventListener('beforeunload', stopMedia);
  }

  function toast(message) {
    const node = $('#toast'); node.textContent = message; node.classList.add('show');
    clearTimeout(state.toastTimer); state.toastTimer = setTimeout(() => node.classList.remove('show'), 3400);
  }
  function showView(name) {
    $$('.inspector-view').forEach(view => view.classList.toggle('active', view.id === `view-${name}`));
    $$('.inspector-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.view === name));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function syncForm() {
    const data = new FormData($('#inspectionForm'));
    state.record.customer = { customerName: data.get('customerName') || '', mobile: data.get('mobile') || '', email: data.get('email') || '', owner: data.get('owner') || '', technician: data.get('technician') || '', inspectionType: data.get('inspectionType') || '', deviceCondition: data.get('deviceCondition') || '', remarks: data.get('remarks') || '' };
    state.record.device = { manufacturer: data.get('manufacturer') || '', model: data.get('model') || '', serial: data.get('serial') || '', operatingSystem: data.get('operatingSystem') || '', processor: data.get('processor') || '', memory: data.get('memory') || '', storage: data.get('storage') || '', graphics: data.get('graphics') || '' };
    renderSummary();
  }
  function restoreForm() {
    const form = $('#inspectionForm');
    for (const [key,value] of Object.entries({...state.record.customer,...state.record.device})) {
      if (form.elements.namedItem(key)) form.elements.namedItem(key).value = value || '';
    }
    $('#customerConfirm').checked = !!state.record.confirmation;
    $('#customerSignature').value = state.record.confirmationName || '';
  }
  async function collectBrowserFacts() {
    const nav = navigator;
    const facts = {
      'Operating system hint': nav.userAgentData?.platform || nav.platform || 'Not exposed',
      'Browser': nav.userAgentData?.brands?.map(b => `${b.brand} ${b.version}`).join(', ') || nav.userAgent,
      'Logical CPU count': nav.hardwareConcurrency ? `${nav.hardwareConcurrency} reported threads` : 'Not exposed',
      'Memory hint': nav.deviceMemory ? `About ${nav.deviceMemory} GB (rounded browser hint)` : 'Not exposed',
      'Screen': `${screen.width} × ${screen.height} CSS pixels`,
      'Pixel ratio': String(window.devicePixelRatio || 'Unknown'),
      'Language': nav.language || 'Unknown',
      'Online status': nav.onLine ? 'Browser reports online' : 'Browser reports offline',
      'Battery': 'Not queried. Browser battery data is intentionally not collected automatically.'
    };
    if (nav.userAgentData?.getHighEntropyValues) {
      try {
        const extra = await nav.userAgentData.getHighEntropyValues(['architecture','bitness','model','platformVersion']);
        if (extra.architecture) facts['Browser architecture hint'] = extra.architecture + (extra.bitness ? ` ${extra.bitness}-bit` : '');
        if (extra.model) facts['Browser model hint'] = extra.model;
      } catch { /* optional browser hint is not available */ }
    }
    state.record.browserFacts = facts;
    $('#browserFacts').innerHTML = Object.entries(facts).map(([k,v]) => `<div class="fact"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('');
    renderSummary(); toast('Browser hints collected. These are not full hardware inventory.');
  }
  function addCheck() {
    const name = $('#manualCheck').value, status = $('#manualStatus').value, note = $('#manualNote').value.trim();
    if (['WARNING','FAIL'].includes(status) && !note) { toast('Add a note explaining a warning or failure.'); $('#manualNote').focus(); return; }
    state.record.checks.push({ id: randomId(), name, status, note: note || (status === 'PASS' ? 'Technician confirmed this check.' : status === 'NOT TESTED' ? 'Not run.' : status === 'NOT SUPPORTED' ? 'Not supported or unavailable.' : 'Technician confirmation required.'), time: new Date().toISOString() });
    $('#manualNote').value = ''; renderRecord(); renderSummary();
  }
  function statusClass(status) { return status === 'PASS' ? 'pass' : status === 'WARNING' ? 'warning' : status === 'FAIL' ? 'fail' : ''; }
  function renderChecks(target) {
    const checks = state.record.checks;
    if (!checks.length) { target.innerHTML = '<div class="empty-state">No results recorded yet.</div>'; return; }
    target.innerHTML = checks.slice().reverse().map(item => `<div class="result-row"><div><strong>${esc(item.name)}</strong><small>${esc(item.note)} · ${esc(new Date(item.time).toLocaleString())}</small></div><div class="result-actions"><span class="status-pill ${statusClass(item.status)}">${esc(item.status)}</span><button class="result-delete" data-check-id="${esc(item.id)}" aria-label="Delete ${esc(item.name)} result">×</button></div></div>`).join('');
  }
  function renderRecord() { renderChecks($('#diagnosticResults')); renderChecks($('#overviewResults')); }
  function deleteCheck(event) {
    const button = event.target.closest('[data-check-id]'); if (!button) return;
    state.record.checks = state.record.checks.filter(item => item.id !== button.dataset.checkId); renderRecord(); renderSummary();
  }
  function score() {
    const scored = state.record.checks.filter(c => ['PASS','WARNING','FAIL'].includes(c.status));
    if (!scored.length) return { value: null, count: scored.length };
    const points = { PASS:100, WARNING:60, FAIL:0 };
    return { value: Math.round(scored.reduce((sum,c) => sum + points[c.status], 0) / scored.length), count: scored.length };
  }
  function renderSummary() {
    const r = state.record, device = [r.device.manufacturer,r.device.model].filter(Boolean).join(' ');
    $('#inspectionId').textContent = r.id; $('#inspectionDate').textContent = new Date(r.createdAt).toLocaleString();
    $('#summaryDevice').textContent = device || 'Not identified'; $('#summaryOS').textContent = r.device.operatingSystem || r.browserFacts['Operating system hint'] || 'Add details to begin';
    $('#summaryChecks').textContent = String(r.checks.length); $('#summaryTech').textContent = r.customer.technician || 'Not entered'; $('#summaryCustomer').textContent = r.customer.customerName || 'No customer details';
    const s = score(); $('#summaryScore').textContent = s.value === null ? 'No assessment yet' : `${s.value}/100 · ${s.count} completed checks`;
    $('#progressBar').style.width = `${Math.min(100, r.checks.length * 10)}%`;
    $('#progressText').textContent = `${r.checks.length} checks recorded`;
    $('#scoreText').textContent = s.value === null ? 'Score unavailable' : `Summary score ${s.value}/100`;
  }
  function renderPhysical() {
    $('#physicalRows').innerHTML = PHYSICAL_ITEMS.map((item,index) => `<tr><td>${esc(item)}</td><td><select data-physical-status="${index}" aria-label="${esc(item)} condition"><option>Not inspected</option><option>PASS</option><option>DAMAGED</option><option>MISSING</option><option>NOT APPLICABLE</option></select></td><td><input data-physical-note="${index}" aria-label="${esc(item)} remarks" placeholder="Optional observation"></td></tr>`).join('');
  }
  function syncPhysical() {
    state.record.physical = Object.fromEntries(PHYSICAL_ITEMS.map((item,index) => [item,{ status:$(`[data-physical-status="${index}"]`).value, note:$(`[data-physical-note="${index}"]`).value.trim() }]).filter(([,value]) => value.status !== 'Not inspected' || value.note));
  }
  function saveRecord() {
    syncForm(); syncPhysical(); state.record.updatedAt = new Date().toISOString();
    const records = safeRead(); const index = records.findIndex(item => item.id === state.record.id);
    if (index >= 0) records[index] = structuredClone(state.record); else records.unshift(structuredClone(state.record));
    if (safeWrite(records)) { renderSaved(); toast('Inspection saved in this browser.'); }
  }
  function renderSaved() {
    const query = ($('#recordSearch')?.value || '').trim().toLowerCase();
    const records = safeRead().filter(r => [r.id,r.customer?.customerName,r.device?.manufacturer,r.device?.model,r.device?.serial].join(' ').toLowerCase().includes(query));
    if (!records.length) { $('#savedRecords').innerHTML = `<div class="empty-state">${query ? 'No matching saved inspections.' : 'No saved inspections in this browser.'}</div>`; return; }
    $('#savedRecords').innerHTML = records.map(r => `<div class="saved-record"><div><strong>${esc(r.customer?.customerName || 'Customer not entered')} · ${esc([r.device?.manufacturer,r.device?.model].filter(Boolean).join(' ') || 'Device not identified')}</strong><small>${esc(r.id)} · ${esc(new Date(r.updatedAt || r.createdAt).toLocaleString())} · ${Number(r.checks?.length || 0)} checks</small></div><div class="saved-record-actions"><button class="inspector-button secondary" data-load-id="${esc(r.id)}">Open</button><button class="inspector-button danger" data-delete-id="${esc(r.id)}">Delete</button></div></div>`).join('');
  }
  function savedAction(event) {
    const load = event.target.closest('[data-load-id]'), del = event.target.closest('[data-delete-id]');
    if (load) openRecord(load.dataset.loadId);
    if (del && confirm('Delete this saved inspection from this browser?')) { safeWrite(safeRead().filter(r => r.id !== del.dataset.deleteId)); renderSaved(); toast('Saved inspection deleted.'); }
  }
  function openRecord(id) {
    const record = safeRead().find(item => item.id === id); if (!record) return;
    state.record = { ...newRecord(), ...record, customer: record.customer || {}, device: record.device || {}, browserFacts: record.browserFacts || {}, checks: record.checks || [], physical: record.physical || {} };
    restoreForm(); renderPhysical();
    for (let i=0;i<PHYSICAL_ITEMS.length;i++) { const value=state.record.physical[PHYSICAL_ITEMS[i]]; if (value) { $(`[data-physical-status="${i}"]`).value=value.status; $(`[data-physical-note="${i}"]`).value=value.note || ''; } }
    if (Object.keys(state.record.browserFacts).length) $('#browserFacts').innerHTML=Object.entries(state.record.browserFacts).map(([k,v])=>`<div class="fact"><small>${esc(k)}</small><strong>${esc(v)}</strong></div>`).join('');
    renderRecord(); renderSummary(); showView('overview'); toast('Inspection opened.');
  }
  function resetRecord() {
    if ((state.record.checks.length || state.record.customer.customerName || state.record.device.model) && !confirm('Start a new inspection? Save or export the current inspection first if you need it.')) return;
    stopMedia(); state.record = newRecord(); $('#inspectionForm').reset(); $('#customerConfirm').checked=false; $('#customerSignature').value=''; $('#browserFacts').innerHTML='<div class="empty-state">Choose “Read available details” to see information this browser exposes.</div>';
    renderPhysical(); renderRecord(); renderSummary(); showView('overview');
  }
  function reportData() {
    syncForm(); syncPhysical();
    return { company:'CCTech IT Solutions', reportTitle:'Laptop Inspection Report', ...structuredClone(state.record), score:score(), generatedAt:new Date().toISOString(), privacy:'This report was generated locally in the browser. Browser hints are not full hardware inventory. Technician checks require human confirmation.' };
  }
  function csvCell(value) {
    let text = String(value ?? '');
    if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
    return `"${text.replaceAll('"','""')}"`;
  }
  function makeCsv(data) {
    const rows=[['Section','Field','Value']];
    for (const section of ['customer','device','browserFacts','physical']) for (const [key,value] of Object.entries(data[section] || {})) rows.push([section,key,typeof value==='object'?JSON.stringify(value):value]);
    for (const check of data.checks) rows.push(['diagnostic',check.name,`${check.status}: ${check.note}`]);
    rows.push(['inspection','id',data.id],['inspection','type',data.customer.inspectionType],['inspection','remarks',data.customer.remarks],['inspection','score',data.score.value ?? 'Not scored']);
    return '\ufeff'+rows.map(row=>row.map(csvCell).join(',')).join('\r\n');
  }
  function reportHtml(data) {
    const table = obj => `<table>${Object.entries(obj || {}).map(([k,v])=>`<tr><th>${esc(k)}</th><td>${esc(typeof v==='object'?JSON.stringify(v):v || 'Not recorded')}</td></tr>`).join('')}</table>`;
    const checks = data.checks.length ? data.checks.map(c=>`<tr><td>${esc(c.name)}</td><td>${esc(c.status)}</td><td>${esc(c.note)}</td></tr>`).join('') : '<tr><td colspan="3">No diagnostic checks recorded</td></tr>';
    const physical = Object.entries(data.physical).map(([k,v])=>`<tr><td>${esc(k)}</td><td>${esc(v.status)}</td><td>${esc(v.note)}</td></tr>`).join('') || '<tr><td colspan="3">No physical checks recorded</td></tr>';
    return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(data.id)} · CCTech Inspection</title><style>body{max-width:900px;margin:30px auto;padding:0 20px;font:14px Arial;color:#172b4d}h1{color:#145486}h2{margin-top:28px;border-bottom:2px solid #45bfa4;padding-bottom:6px}table{width:100%;border-collapse:collapse;margin:10px 0 20px}td,th{border:1px solid #d4dee7;padding:8px;text-align:left;vertical-align:top}th{background:#edf4f8}p.note{padding:12px;background:#edf7f5;color:#335e58;line-height:1.55}@media print{body{margin:0;max-width:none}}</style><h1>CCTech IT Solutions — Laptop Inspection</h1><p><b>Reference:</b> ${esc(data.id)} · <b>Inspection date:</b> ${esc(new Date(data.createdAt).toLocaleString())}</p><p><b>Customer:</b> ${esc(data.customer.customerName||'Not entered')} · <b>Technician:</b> ${esc(data.customer.technician||'Not entered')} · <b>Score:</b> ${data.score.value===null?'Not scored':`${data.score.value}/100`}</p><h2>Customer & service</h2>${table(data.customer)}<h2>Device details</h2>${table(data.device)}<h2>Browser-reported hints</h2>${table(data.browserFacts)}<h2>Diagnostic results</h2><table><tr><th>Check</th><th>Status</th><th>Technician notes</th></tr>${checks}</table><h2>Physical inspection</h2><table><tr><th>Item</th><th>Condition</th><th>Remarks</th></tr>${physical}</table><h2>Remarks</h2><p>${esc(data.customer.remarks||'None recorded')}</p><p class="note">${esc(data.privacy)}</p><p><small>Customer confirmation recorded: ${data.confirmation?'Yes':'No'}${data.confirmationName?` · ${esc(data.confirmationName)}`:''}. A typed acknowledgement is not a cryptographic signature.</small></p></html>`;
  }
  function download(format) {
    const data=reportData(); let content,type,ext;
    if(format==='json'){content=JSON.stringify(data,null,2);type='application/json';ext='json';}
    else if(format==='csv'){content=makeCsv(data);type='text/csv;charset=utf-8';ext='csv';}
    else {content=reportHtml(data);type='text/html;charset=utf-8';ext='html';}
    const blob=new Blob([content],{type}), url=URL.createObjectURL(blob), a=document.createElement('a'); a.href=url; a.download=`${data.id}.${ext}`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500); toast(`${ext.toUpperCase()} report exported.`);
  }
  function printReport() {
    const html=reportHtml(reportData()), win=window.open('','_blank');
    if(!win){toast('Allow the print window for this site, then try again.');return;}
    win.document.open();win.document.write(html);win.document.close();win.focus();setTimeout(()=>win.print(),350);
  }
  const KEY_ROWS = [
    [['Esc','Escape'],['F1','F1'],['F2','F2'],['F3','F3'],['F4','F4'],['F5','F5'],['F6','F6'],['F7','F7'],['F8','F8'],['F9','F9'],['F10','F10'],['F11','F11'],['F12','F12']],
    [['`','Backquote'],['1','Digit1'],['2','Digit2'],['3','Digit3'],['4','Digit4'],['5','Digit5'],['6','Digit6'],['7','Digit7'],['8','Digit8'],['9','Digit9'],['0','Digit0'],['-','Minus'],['=','Equal'],['Backspace','Backspace','wide']],
    [['Tab','Tab','wide'],['Q','KeyQ'],['W','KeyW'],['E','KeyE'],['R','KeyR'],['T','KeyT'],['Y','KeyY'],['U','KeyU'],['I','KeyI'],['O','KeyO'],['P','KeyP'],['[','BracketLeft'],[']','BracketRight'],['\\','Backslash']],
    [['Caps','CapsLock','wide'],['A','KeyA'],['S','KeyS'],['D','KeyD'],['F','KeyF'],['G','KeyG'],['H','KeyH'],['J','KeyJ'],['K','KeyK'],['L','KeyL'],[';','Semicolon'],["'",'Quote'],['Enter','Enter','wide']],
    [['Shift','ShiftLeft','xwide'],['Z','KeyZ'],['X','KeyX'],['C','KeyC'],['V','KeyV'],['B','KeyB'],['N','KeyN'],['M','KeyM'],[',','Comma'],['.','Period'],['/','Slash'],['Shift','ShiftRight','xwide']],
    [['Ctrl','ControlLeft','wide'],['Win','MetaLeft'],['Alt','AltLeft'],['Space','Space','space'],['Alt','AltRight'],['Menu','ContextMenu'],['Ctrl','ControlRight','wide']]
  ];
  function openKeyboard() { state.keyCodes.clear(); $('#keyboardLayout').innerHTML=KEY_ROWS.map(row=>`<div class="key-row">${row.map(([label,code,size=''])=>`<span class="keycap ${size}" data-key-code="${esc(code)}">${esc(label)}</span>`).join('')}</div>`).join(''); $('#keysPressed').textContent='0'; $('#keyboardSummary').textContent='Press keys to light them up. Some layout keys may differ.'; $('#keyboardOverlay').hidden=false; }
  function finishKeyboard() {
    const count=state.keyCodes.size; closeOverlay('keyboardOverlay');
    if (!count) { addToolResult('Keyboard','No keys were detected during this session.', 'NOT TESTED'); return; }
    const confirmed=count>=20 && confirm(`The browser detected ${count} unique key codes. Did you verify the physical keyboard layout and confirm the expected keys work?`);
    addToolResult('Keyboard',`Browser detected ${count} unique key codes. PASS requires separate technician confirmation of the physical keys.`,confirmed?'PASS':'MANUAL VERIFICATION REQUIRED');
  }
  function handleGlobalKey(event) {
    if (!$('#keyboardOverlay').hidden) {
      if (event.key==='Escape') { event.preventDefault(); closeOverlay('keyboardOverlay'); return; }
      if (event.code==='Space') event.preventDefault();
      state.keyCodes.add(event.code); $('#keysPressed').textContent=String(state.keyCodes.size);
      const key=$(`[data-key-code="${CSS.escape(event.code)}"]`); if(key)key.classList.add('hit');
      $('#keyboardSummary').textContent=`Last detected: ${event.code}. Browser input does not prove that a physical key is reliable.`;
    }
    if (!$('#displayOverlay').hidden) {
      if(event.key==='Escape'){closeOverlay('displayOverlay');event.preventDefault();}
      else if(event.code==='Space'){event.preventDefault();advanceDisplay();}
    }
  }
  const COLORS=[['White','#ffffff','#101828'],['Black','#000000','#ffffff'],['Red','#ff0000','#ffffff'],['Green','#00d26a','#101828'],['Blue','#0000ff','#ffffff']];
  function openDisplay() { state.colorIndex=0; $('#displayOverlay').hidden=false; applyColor(); }
  function applyColor() { const [name,bg,fg]=COLORS[state.colorIndex]; $('#displaySurface').style.background=bg; $('#displaySurface').style.color=fg; $('#displayColorName').textContent=name; }
  function advanceDisplay() { if($('#displayOverlay').hidden)return; state.colorIndex++; if(state.colorIndex>=COLORS.length){ closeOverlay('displayOverlay'); const answer=confirm('Did you visually inspect all color screens? Select OK if no visible issue was found.'); addToolResult('Display','Technician reviewed white, black, red, green and blue screens.',answer?'PASS':'WARNING'); return; } applyColor(); }
  function closeOverlay(id) { $(`#${id}`).hidden=true; }
  function addToolResult(name,note,status) { state.record.checks.push({id:randomId(),name,status,note,time:new Date().toISOString()}); renderRecord();renderSummary(); }
  async function cameraTest() {
    if(state.mediaRecorder?.state==='recording'){toast('Finish the microphone test before starting the camera.');return;}
    if(state.stream){stopMedia();$('#openCamera').textContent='Start camera preview';toast('Camera preview stopped.');return;}
    if(!navigator.mediaDevices?.getUserMedia){toast('Camera preview is unavailable. Use manual verification.');return;}
    try { state.stream=await navigator.mediaDevices.getUserMedia({video:true,audio:false}); const video=$('#cameraPreview');video.srcObject=state.stream;video.hidden=false;$('#openCamera').textContent='Stop camera preview';
      if(confirm('Is the camera preview working as expected?')) addToolResult('Camera','Technician confirmed the permission-based browser preview.', 'PASS'); else addToolResult('Camera','Camera preview was attempted; technician observed an issue or could not confirm.', 'WARNING');
    } catch(error) { toast(error.name==='NotAllowedError'?'Camera permission was declined. No camera result was recorded.':'Camera could not be opened in this browser.'); }
  }
  async function microphoneTest() {
    if(state.mediaRecorder?.state==='recording'){state.mediaRecorder.stop();return;}
    if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){toast('Microphone recording is unavailable in this browser.');return;}
    try {
      if(state.stream) stopMedia();
      state.stream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});state.audioChunks=[];
      const recorder=new MediaRecorder(state.stream);state.mediaRecorder=recorder;recorder.ondataavailable=e=>{if(e.data.size)state.audioChunks.push(e.data);};
      recorder.onstop=()=>{const blob=new Blob(state.audioChunks,{type:recorder.mimeType||'audio/webm'});const audio=$('#micPlayback');audio.src=URL.createObjectURL(blob);audio.hidden=false;$('#recordMic').textContent='Record again';stopTracks();const answer=confirm('Play the short recording. Was your voice clearly recorded and played back?');addToolResult('Microphone','Technician reviewed a short browser recording.',answer?'PASS':'WARNING');};
      recorder.start();$('#recordMic').textContent='Stop recording';toast('Recording for 4 seconds. Speak now.');setTimeout(()=>{if(recorder.state==='recording')recorder.stop();},4000);
    } catch(error) { toast(error.name==='NotAllowedError'?'Microphone permission was declined. No audio was recorded.':'Microphone could not be opened in this browser.'); }
  }
  function stopTracks() { if(state.stream){state.stream.getTracks().forEach(track=>track.stop());state.stream=null;} }
  function stopMedia() { if(state.mediaRecorder?.state==='recording'){state.mediaRecorder.onstop=null;state.mediaRecorder.stop();}state.mediaRecorder=null;stopTracks(); const video=$('#cameraPreview');if(video){video.srcObject=null;video.hidden=true;} }
  function speakerTest() {
    try { const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx){toast('Audio playback is unsupported in this browser.');return;}const context=new AudioCtx(),osc=context.createOscillator(),gain=context.createGain();osc.type='sine';osc.frequency.value=660;gain.gain.setValueAtTime(.0001,context.currentTime);gain.gain.exponentialRampToValueAtTime(.13,context.currentTime+.04);gain.gain.exponentialRampToValueAtTime(.0001,context.currentTime+.75);osc.connect(gain);gain.connect(context.destination);osc.start();osc.stop(context.currentTime+.8);osc.onended=()=>context.close();toast('Playing speaker test tone.');setTimeout(()=>{const answer=confirm('Did you hear the speaker test tone?');addToolResult('Speakers','Short tone played through the browser-selected audio output.',answer?'PASS':'WARNING');},900); }
    catch { toast('Audio output test could not start.'); }
  }

  init();
})();
