const STORAGE_KEY = 'crud_skate_items_v1';
const $ = s => document.querySelector(s);
const form = $('#form');
const titleInput = $('#title');
const categoryInput = $('#category');
const descInput = $('#desc');
const qInput = $('#q');
const listWrap = $('#listWrap');
const btnAdd = $('#btnAdd');
const btnClear = $('#btnClear');
const btnExport = $('#btnExport');
const btnImport = $('#btnImport');
const btnReset = $('#btnReset');


let items = loadItems();
let editingId = null;
renderList(items);


form.addEventListener('submit', e => {
e.preventDefault();
const title = titleInput.value.trim();
if (!title) return alert('Preencha o nome.');


const data = { title, category: categoryInput.value, desc: descInput.value.trim() };
editingId ? update(editingId, data) : add(data);
form.reset(); titleInput.focus();
});


btnClear.onclick = () => form.reset();
qInput.oninput = () => {
const q = qInput.value.toLowerCase();
renderList(items.filter(i => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)));
};
btnReset.onclick = () => { if (confirm('Apagar tudo?')) { items = []; save(); renderList(items); } };
btnExport.onclick = () => {
const blob = new Blob([JSON.stringify(items,null,2)],{type:'application/json'});
const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='skate.json'; a.click();
};
btnImport.onclick = () => {
const input=document.createElement('input'); input.type='file'; input.accept='.json';
input.onchange=()=>{
const file=input.files[0]; if(!file)return;
const r=new FileReader();
r.onload=e=>{ try{ items=JSON.parse(e.target.result); save(); renderList(items);}catch{alert('Erro ao importar');} };
r.readAsText(file);
};
input.click();
};


function add(data){ items.unshift({id:Date.now(),...data,created:Date.now()}); save(); renderList(items); }
function update(id,data){ const i=items.findIndex(x=>x.id===id); if(i>-1){items[i]={...items[i],...data}; save(); renderList(items);} editingId=null; btnAdd.textContent='Incluir'; }
function remove(id){ if(confirm('Excluir?')){ items=items.filter(i=>i.id!==id); save(); renderList(items); } }
function edit(id){ const i=items.find(x=>x.id===id); if(!i)return; editingId=id; titleInput.value=i.title; categoryInput.value=i.category; descInput.value=i.desc; btnAdd.textContent='Alterar'; }
function consult(id){ const i=items.find(x=>x.id===id); if(i)alert(`Nome: ${i.title}\nCategoria: ${i.category}\nDescrição: ${i.desc||'(vazio)'}`); }
function renderList(list){
if(!list.length){ listWrap.innerHTML='<div class="empty">Nenhum item</div>'; return; }
let html='<table class="table"><tr><th>Nome</th><th>Categoria</th><th>Descrição</th><th>Ações</th></tr>';
for(const i of list){
html+=`<tr><td>${i.title}</td><td>${i.category}</td><td>${i.desc||''}</td><td class="actions">
<button class="btn secondary" onclick="consult(${i.id})">Consultar</button>
<button class="btn" onclick="edit(${i.id})">Alterar</button>
<button class="btn danger" onclick="remove(${i.id})">Excluir</button></td></tr>`;
}
html+='</table>'; listWrap.innerHTML=html;
}
function loadItems(){ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); }
function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }