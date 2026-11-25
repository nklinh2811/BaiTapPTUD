const API = '/api/tasks';
const $ = (id) => document.getElementById(id);
let allTasks = [];

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
};
const prettyDate = (value) => value ? new Date(`${String(value).slice(0,10)}T00:00:00`).toLocaleDateString('vi-VN') : 'No date';
const statusText = (s) => ({todo:'To do', in_progress:'In progress', completed:'Completed'}[s] || s);
const priorityText = (p) => ({low:'Low', medium:'Medium', high:'High'}[p] || p);

async function request(url, options={}) {
  const response = await fetch(url, {headers:{'Content-Type':'application/json'}, ...options});
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Có lỗi xảy ra.');
  return data;
}
function toast(message) {
  $('toast').textContent = message;
  $('toast').classList.add('show');
  setTimeout(() => $('toast').classList.remove('show'), 2400);
}
function taskRow(task) {
  return `<div class="task-row">
    <input class="task-check" type="checkbox" ${task.status==='completed'?'checked':''} aria-label="Mark completed" onchange="toggleTask(${task.id}, this.checked)">
    <div class="task-info"><b>${escapeHtml(task.title)}</b><small>${escapeHtml(task.category || 'Personal')} · Due ${prettyDate(task.due_date)}</small></div>
    <div class="task-meta"><span class="priority ${task.priority}">${priorityText(task.priority)}</span></div>
    <div class="row-actions"><button class="icon-btn" title="Edit" onclick="editTask(${task.id})">✎</button><button class="icon-btn" title="Delete" onclick="deleteTask(${task.id})">×</button></div>
  </div>`;
}
function escapeHtml(value='') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
async function loadTasks() {
  try {
    allTasks = await request(API);
    renderDashboard();
    renderAllTasks();
    await loadStats();
  } catch (error) { toast(error.message + ' Kiểm tra MySQL và cấu hình .env.'); }
}
function renderDashboard() {
  const today = todayISO();
  const todayTasks = allTasks.filter(t => String(t.due_date).slice(0,10) === today);
  const completed = allTasks.filter(t => t.status === 'completed').length;
  const progress = allTasks.filter(t => t.status === 'in_progress').length;
  const overdue = allTasks.filter(t => t.status !== 'completed' && String(t.due_date).slice(0,10) < today).length;
  $('totalCount').textContent = allTasks.length;
  $('progressCount').textContent = progress;
  $('completedCount').textContent = completed;
  $('overdueCount').textContent = overdue;
  const todayDone = todayTasks.filter(t => t.status === 'completed').length;
  const percent = todayTasks.length ? Math.round(todayDone/todayTasks.length*100) : 0;
  $('todayProgressText').textContent = `${todayDone} of ${todayTasks.length} completed`;
  $('todayPercent').textContent = percent + '%';
  $('todayProgressBar').style.width = percent + '%';
  $('todayTasks').innerHTML = todayTasks.length ? todayTasks.map(taskRow).join('') : '<div class="empty-state">No tasks due today. Enjoy the breathing room ✨</div>';
  const total = allTasks.length || 1;
  $('donutPercent').textContent = Math.round(completed/total*100) + '%';
  $('donut').style.background = `conic-gradient(#7962c5 ${completed/total*360}deg, #ffc928 ${completed/total*360}deg ${(completed+progress)/total*360}deg, #f7799d ${(completed+progress)/total*360}deg 360deg)`;
  $('legendCompleted').textContent = completed;
  $('legendProgress').textContent = progress;
  $('legendTodo').textContent = allTasks.filter(t => t.status==='todo').length;
}
function renderAllTasks() {
  const search = $('searchInput').value.toLowerCase();
  const status = $('statusFilter').value;
  const priority = $('priorityFilter').value;
  const filtered = allTasks.filter(t => t.title.toLowerCase().includes(search) &&
    (!status || t.status===status) && (!priority || t.priority===priority));
  $('allTasks').innerHTML = filtered.length ? filtered.map(taskRow).join('') : '<div class="empty-state">No matching tasks found.</div>';
}
async function loadStats() {
  const s = await request(`${API}/stats/summary`);
  $('sTotal').textContent = s.total || 0;
  $('sCompleted').textContent = s.completed || 0;
  $('sProgress').textContent = s.in_progress || 0;
  $('sOverdue').textContent = s.overdue || 0;
  const max = Math.max(1, ...s.weekly.map(d => Number(d.total)));
  $('barChart').innerHTML = s.weekly.length ? s.weekly.map(d => `<div class="bar-item"><div class="bar-pair"><i class="bar total" style="height:${Math.max(3,Number(d.total)/max*125)}px"></i><i class="bar" style="height:${Math.max(3,Number(d.completed)/max*125)}px"></i></div><small>${escapeHtml(d.day)}</small></div>`).join('') : '<div class="empty-state">Not enough task data for this chart yet.</div>';
  const values = [{name:'Completed',n:Number(s.completed)||0,color:'#7962c5'},{name:'In progress',n:Number(s.in_progress)||0,color:'#ffc928'},{name:'To do',n:Number(s.todo)||0,color:'#f7799d'}];
  $('statusBreakdown').innerHTML = values.map(v => `<div class="break-row"><span>${v.name}</span><div class="break-track"><i style="width:${s.total? v.n/s.total*100:0}%;background:${v.color}"></i></div><b>${v.n}</b></div>`).join('');
}
function openDialog(task=null) {
  $('taskForm').reset();
  $('taskId').value = task?.id || '';
  $('dialogTitle').textContent = task ? 'Edit task' : 'Create a task';
  $('taskTitle').value = task?.title || '';
  $('taskDescription').value = task?.description || '';
  $('startDate').value = task?.start_date ? String(task.start_date).slice(0,10) : todayISO();
  $('dueDate').value = task?.due_date ? String(task.due_date).slice(0,10) : todayISO();
  $('taskPriority').value = task?.priority || 'medium';
  $('taskStatus').value = task?.status || 'todo';
  $('taskCategory').value = task?.category || 'Personal';
  $('taskDialog').showModal();
}
async function editTask(id) {
  const task = allTasks.find(t => t.id === id);
  if (task) openDialog(task);
}
async function deleteTask(id) {
  if (!confirm('Bạn có chắc muốn xóa công việc này?')) return;
  try { await request(`${API}/${id}`, {method:'DELETE'}); toast('Đã xóa công việc.'); await loadTasks(); }
  catch(e) { toast(e.message); }
}
async function toggleTask(id, checked) {
  const task = allTasks.find(t => t.id === id);
  if (!task) return;
  try {
    await request(`${API}/${id}`, {method:'PUT', body:JSON.stringify({...task, status:checked?'completed':'todo'})});
    await loadTasks();
  } catch(e) { toast(e.message); }
}
window.editTask = editTask;
window.deleteTask = deleteTask;
window.toggleTask = toggleTask;

function switchPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  $(`${page}Page`).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.page===page));
  const titles = {dashboard:'Good morning! ', tasks:'Your tasks ', statistics:'Your progress '};
  $('pageTitle').innerHTML = `${titles[page]}<span>✦</span>`;
}
document.querySelectorAll('.nav-link').forEach(b => b.addEventListener('click', () => switchPage(b.dataset.page)));
document.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => switchPage(b.dataset.goto)));
$('addTaskBtn').addEventListener('click', () => openDialog());
$('addTaskBtn2').addEventListener('click', () => openDialog());
$('closeDialog').addEventListener('click', () => $('taskDialog').close());
$('cancelDialog').addEventListener('click', () => $('taskDialog').close());
$('searchInput').addEventListener('input', renderAllTasks);
$('statusFilter').addEventListener('change', renderAllTasks);
$('priorityFilter').addEventListener('change', renderAllTasks);
$('taskForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = $('taskId').value;
  const payload = {
    title:$('taskTitle').value, description:$('taskDescription').value,
    start_date:$('startDate').value || null, due_date:$('dueDate').value,
    priority:$('taskPriority').value, status:$('taskStatus').value,
    category:$('taskCategory').value || 'Personal'
  };
  try {
    await request(id ? `${API}/${id}` : API, {method:id?'PUT':'POST', body:JSON.stringify(payload)});
    $('taskDialog').close();
    toast(id ? 'Đã cập nhật công việc!' : 'Đã thêm công việc!');
    await loadTasks();
  } catch(e) { toast(e.message); }
});
const now = new Date();
$('datePill').textContent = now.toLocaleDateString('vi-VN',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
$('todayLabel').textContent = now.toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'long'}).toUpperCase();
loadTasks();
