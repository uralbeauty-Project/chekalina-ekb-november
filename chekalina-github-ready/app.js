'use strict';
(() => {
  const questions = [
    {title:'Какой у вас опыт работы?',options:[['new','Начинаю или работаю меньше года'],['practicing','Работаю от одного года']]},
    {title:'Вы уже обучались геометрическим стрижкам?',options:[['no','Нет, пока не обучалась / не обучался'],['yes','Да, у другого преподавателя'],['svetlana','Уже проходила / проходил модули Светланы']]},
    {title:'Что сейчас важнее для вас?',options:[['system','Начать глубокое, последовательное обучение'],['short','Познакомиться с методом через короткие формы'],['help','Обсудить мою задачу с организатором']]}
  ];
  const answers=[];
  let step=0;
  const body=document.getElementById('quiz-body');
  const progress=document.getElementById('quiz-progress');
  const fill=document.getElementById('progress-fill');
  body.setAttribute('aria-live','polite');
  function recommendation(a){
    if(a[2]==='help') return 'consult';
    if(a[0]==='new') return 'beginner';
    if(a[1]==='svetlana') return 'continue';
    if(a[2]==='system') return 'main';
    if(a[1]==='yes') return 'consult';
    return 'dna';
  }
  const results={
    continue:{title:'Продолжите свой модуль',text:'Вы уже учились у Светланы. Выберите следующий модуль основного курса по вашему этапу: второй после первого, третий после второго. После трёх основных модулей предусмотрено повышение квалификации — обсудите его с Оксаной.',facts:'Основной курс · 30 часов и 75 000 ₽ за модуль',anchor:'main-course'},
    main:{title:'Первый модуль основного курса',text:'Вы хотите последовательно освоить метод. Если начинаете обучение в системе Светланы, вход — с первого модуля. Диагностика, выбор формы и геометрическое построение изучаются в единой системе.',facts:'17–20 ноября · 30 часов · 75 000 ₽',anchor:'main-course'},
    dna:{title:'ДНК коротких стрижек',text:'Ваш опыт и цель соответствуют условиям интенсива: от года практики, без предыдущего обучения геометрическим стрижкам. Это короткий вход в метод через четыре работы на моделях.',facts:'20–21 ноября · 12 часов · 25 000 ₽',anchor:'dna-course'},
    beginner:{title:'Начните с обсуждения подготовки',text:'В основном курсе есть маршрут для начинающих. Расскажите Оксане о своих технических навыках: она поможет определить готовность к первому модулю. «ДНК» этого набора рассчитана на опыт от одного года.',facts:'Возможный маршрут — основной курс',anchor:'main-course'},
    consult:{title:'Подберём маршрут под ваш опыт',text:'Напишите Оксане, чему вы уже учились и что хотите улучшить. Обсудим подходящий уровень входа. Если вы уже обучались геометрическим стрижкам, «ДНК» этого набора не соответствует заявленным условиям участия.',facts:'Индивидуальный выбор программы',anchor:'programs'}
  };
  function render(focus=false){
    if(step===questions.length){renderResult(focus);return;}
    const q=questions[step];
    progress.textContent=`Вопрос ${step+1} из ${questions.length}`;
    fill.style.width=`${(step+1)/questions.length*100}%`;
    body.innerHTML=`<h3 class="quiz-title" tabindex="-1">${q.title}</h3><div class="quiz-options"></div>${step?'<button type="button" class="quiz-back">← Предыдущий вопрос</button>':''}`;
    const options=body.querySelector('.quiz-options');
    q.options.forEach(([value,label])=>{
      const button=document.createElement('button');
      button.type='button';button.className='quiz-option';
      button.textContent=label;
      const arrow=document.createElement('span');arrow.textContent='→';arrow.setAttribute('aria-hidden','true');button.append(arrow);
      button.addEventListener('click',()=>{answers[step]=value;answers.length=step+1;step++;render(true);});
      options.append(button);
    });
    body.querySelector('.quiz-back')?.addEventListener('click',()=>{step--;render(true);});
    if(focus)body.querySelector('.quiz-title').focus({preventScroll:true});
  }
  function renderResult(focus){
    const result=results[recommendation(answers)];
    progress.textContent='Ваш следующий шаг';fill.style.width='100%';
    body.innerHTML=`<div class="quiz-result"><p class="result-label">Рекомендация по вашим ответам</p><h3 tabindex="-1">${result.title}</h3><p>${result.text}</p><p><b>${result.facts}</b></p><a class="text-link" href="#${result.anchor}">Посмотреть программу ↓</a><br><a class="button" href="https://t.me/Oksana_Voinich" target="_blank" rel="noopener noreferrer">Обсудить с Оксаной ↗</a><p class="micro">Окончательный выбор и условия участия обсудите с организатором.</p><button type="button" class="quiz-reset">Пройти ещё раз</button></div>`;
    body.querySelector('.quiz-reset').addEventListener('click',()=>{step=0;answers.length=0;render(true);});
    if(focus)body.querySelector('h3').focus({preventScroll:true});
  }
  render();
})();

// Выбор модуля без отправки данных.
(() => {
  const tabs=[...document.querySelectorAll('[data-module]')];
  const info=document.getElementById('module-info');
  const contact=document.getElementById('module-contact');
  const modules={
    1:{title:'Основы метода и построения формы',text:'Диагностика, подбор формы и основы геометрического построения. Связь разделений, оттяжек и срезов с длиной, объёмом и силуэтом. Практика на манекенах и моделях с сопровождением преподавателя.',result:'Понимаете логику построения и выполняете учебную форму по заданным условиям.',entry:'30 часов · начало обучения'},
    2:{title:'Адаптация формы к человеку',text:'Диагностика разных моделей: анатомия, пропорции, структура и свойства волос. Выбор длины, объёма и силуэта, адаптация построения к конкретной модели. Больше самостоятельных решений с коррекцией преподавателя.',result:'Обосновываете выбор формы и адаптируете построение к особенностям человека.',entry:'30 часов · после первого модуля'},
    3:{title:'Самостоятельная работа по методу',text:'Полный цикл: диагностика, анализ вариантов, выбор формы, проектирование и выполнение стрижки. Соединение освоенных знаний и техники в целостную работу. Разбор результата и причин расхождений с замыслом.',result:'Самостоятельно проходите полный цикл работы и объясняете свои профессиональные решения.',entry:'30 часов · после второго модуля'}
  };
  function select(tab,focus=false){
    tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;});
    const number=tab.dataset.module;
    info.setAttribute('aria-labelledby',tab.id);
    const module=modules[number];
    info.innerHTML=`<b>${module.title}</b><p>${module.text}</p><p class="module-result"><strong>Результат:</strong> ${module.result}</p><span class="module-hours">${module.entry}</span>`;
    contact.href='https://t.me/Oksana_Voinich?text='+encodeURIComponent(`Здравствуйте! Хочу обсудить модуль ${number} основного курса Светланы Чекалиной в Екатеринбурге.`);
    contact.setAttribute('aria-label',`Обсудить модуль ${number} с Оксаной Войнич`);
    if(focus)tab.focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(tab));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();select(tabs[next],true);}
    });
  });
  select(tabs[0]);
})();

// Галерея: свайп, стрелки и просмотр полноразмерных фотографий.
(() => {
  const track=document.getElementById('gallery-track');
  const cards=[...track.querySelectorAll('.gallery-card')];
  const prev=document.getElementById('gallery-prev');
  const next=document.getElementById('gallery-next');
  const dialog=document.getElementById('gallery-dialog');
  const image=document.getElementById('dialog-image');
  const caption=document.getElementById('dialog-caption');
  let active=0;
  let trigger=null;
  function updateArrows(){prev.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-3;}
  function scroll(direction){const distance=cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap);track.scrollBy({left:distance*direction,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  prev.addEventListener('click',()=>scroll(-1));next.addEventListener('click',()=>scroll(1));
  track.addEventListener('scroll',updateArrows,{passive:true});window.addEventListener('resize',updateArrows);
  track.addEventListener('keydown',event=>{if(event.target!==track)return;if(event.key==='ArrowRight'){event.preventDefault();scroll(1);}if(event.key==='ArrowLeft'){event.preventDefault();scroll(-1);}});
  function show(index){active=(index+cards.length)%cards.length;const original=cards[active].querySelector('img');image.src=original.getAttribute('src');image.alt=original.alt;caption.textContent=`${active+1} / ${cards.length} · ${cards[active].querySelector('figcaption').textContent.slice(2).trim()}`;}
  track.querySelectorAll('[data-slide]').forEach(button=>button.addEventListener('click',()=>{trigger=button;show(Number(button.dataset.slide));dialog.showModal();document.body.style.overflow='hidden';dialog.querySelector('.dialog-close').focus();}));
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.querySelector('.dialog-prev').addEventListener('click',()=>show(active-1));
  dialog.querySelector('.dialog-next').addEventListener('click',()=>show(active+1));
  dialog.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'){event.preventDefault();show(active-1);}if(event.key==='ArrowRight'){event.preventDefault();show(active+1);}});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';trigger?.focus({preventScroll:true});});
  updateArrows();
})();
