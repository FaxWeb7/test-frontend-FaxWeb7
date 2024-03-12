// sorting storageItems by priority (time)
let storageKeys = Object.keys(localStorage);
storageKeys.sort((a, b) => {
    let priorityA = JSON.parse(localStorage[a]).priority;
    let priorityB = JSON.parse(localStorage[b]).priority;
    return priorityB - priorityA;
});

// variables
var selectedRmResumes = {}; // {title : resumeItemClass}
var selectedResumeToCopy = ''; // resumeTitle
var selectedCopyBlocks = {'personalData': 0, 'selfDescription': 0, 'interests': 0, 'languages': 0, 'experiences': 0, 'educations': 0, 'courses': 0}

// render storage items 
countResumeTitles = 0
for (let resumeTitle of storageKeys){
    const resumeItem = document.createElement('div');
    resumeItem.classList.add('resume-list__item');
    let uniqueVal = 0+countResumeTitles;
    resumeItem.classList.add('resume-list__item'+uniqueVal);
    resumeItem.setAttribute('test-id', 'resume-item');

    const title = document.createElement('h2');
    title.classList.add('resume__item-title');
    title.setAttribute('test-id', 'resume-title');
    title.textContent = resumeTitle;

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('resume__button-wrapper');

    const buttons = document.createElement('div');
    buttons.classList.add('resume__item-buttons', 'invis');
    buttons.setAttribute('id', 'btn-wrapper'+countResumeTitles);

    const openBtn = document.createElement('button');
    openBtn.classList.add('resume__item-open');
    openBtn.setAttribute('id', 'item-open-btn'+countResumeTitles);
    openBtn.setAttribute('test-id', 'resume-actions__open');
    openBtn.setAttribute('title', 'Открыть');
    openBtn.textContent = 'Открыть';
    openBtn.addEventListener('click', () => {
        localStorage.setItem('reqOpenResume', resumeTitle);
        window.location.href = '/';
    });

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('resume__item-open');
    removeBtn.setAttribute('id', 'item-remove-btn'+countResumeTitles);
    removeBtn.setAttribute('test-id', 'resume-actions__delete');
    removeBtn.setAttribute('title', 'Удалить');
    removeBtn.textContent = 'Удалить';
    removeBtn.addEventListener('click', () => {
        localStorage.removeItem(resumeTitle);
        resumeItem.parentElement.removeChild(resumeItem);
    });

    const copyBtn = document.createElement('button');
    copyBtn.classList.add('resume__item-copy');
    copyBtn.setAttribute('id', 'item-copy-btn'+countResumeTitles);
    copyBtn.setAttribute('test-id', 'resume-actions__copy');
    copyBtn.setAttribute('title', 'Копировать');
    copyBtn.textContent = 'Копировать';
    copyBtn.addEventListener('click', () => {
        let modal = document.getElementById('modal');
        modal.style.display = 'block';
        modal.style.visibility = 'visible';
        selectedResumeToCopy = resumeTitle;
    });
    
    const actionsBtn = document.createElement('button');
    actionsBtn.classList.add('resume__item-more');
    actionsBtn.setAttribute('id', 'item-actions-btn'+countResumeTitles);
    actionsBtn.setAttribute('title', 'Действия');
    actionsBtn.setAttribute('test-id', 'resume-actions');
    actionsBtn.addEventListener('click', () => {
        buttons.classList.toggle('invis');
    });

    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgIcon.setAttribute("width", "16");
    svgIcon.setAttribute("height", "16");
    svgIcon.setAttribute("fill", "currentColor");
    svgIcon.classList.add("bi", "bi-three-dots");
    svgIcon.setAttribute("viewBox", "0 0 16 16");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3");
    svgIcon.appendChild(path);
    actionsBtn.appendChild(svgIcon);

    const checkbox = document.createElement('input');
    checkbox.classList.add('resume__item-checkbox');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', 'item-checkbox-btn'+countResumeTitles);
    checkbox.setAttribute('test-id', 'resume-checkbox');
    checkbox.addEventListener('click', () => {
        if (selectedRmResumes[resumeTitle]) {
            delete selectedRmResumes[resumeTitle];
        } else {
            selectedRmResumes[resumeTitle] = 'resume-list__item'+uniqueVal;
        }

        let btn = document.getElementById('resumes-btn-remove')
        if (Object.keys(selectedRmResumes).length > 0 && btn.classList.contains('invis')){
            btn.classList.remove('invis');
        } else if (Object.keys(selectedRmResumes).length <= 0 && (!btn.classList.contains('invis'))){
            btn.classList.add('invis');
        }
    })

    buttons.appendChild(openBtn);
    buttons.appendChild(removeBtn);
    buttons.appendChild(copyBtn);
    buttonWrapper.appendChild(buttons);
    buttonWrapper.appendChild(actionsBtn);
    buttonWrapper.appendChild(checkbox);
    resumeItem.appendChild(title);
    resumeItem.appendChild(buttonWrapper);
    const container = document.getElementById('resume_list'); 
    container.appendChild(resumeItem);
    countResumeTitles++;
}

// main buttons listeners
const appendResumeBtn = document.getElementById('resume-btn-append');
appendResumeBtn.addEventListener('click', () => {
    window.location.href = '/';
})
const removeResumesBtn = document.getElementById('resumes-btn-remove');
removeResumesBtn.addEventListener('click', () => {
    for (let resumeTitle in selectedRmResumes){
        localStorage.removeItem(resumeTitle);
        let resumeItem = document.querySelector(`.${selectedRmResumes[resumeTitle]}`);
        resumeItem.parentElement.removeChild(resumeItem);
    }
    selectedRmResumes = {};
    let btn = document.getElementById('resumes-btn-remove')
    btn.classList.add('invis');
})

// state of checkboxes for copy
const personalCheckbox = document.getElementById('personal-data-checkbox');
personalCheckbox.addEventListener('click', () => {
    selectedCopyBlocks.personalData = !selectedCopyBlocks.personalData;
});
const descriptionCheckbox = document.getElementById('description-checkbox');
descriptionCheckbox.addEventListener('click', () => {
    selectedCopyBlocks.selfDescription = !selectedCopyBlocks.selfDescription;
});
const interestsCheckbox = document.getElementById('interests-checkbox');
interestsCheckbox.addEventListener('click', () => {
    selectedCopyBlocks.interests = !selectedCopyBlocks.interests;
});
const languagesCheckbox = document.getElementById('languages-checkbox');
languagesCheckbox.addEventListener('click', () => {
    selectedCopyBlocks.languages = !selectedCopyBlocks.languages;
});
const experiencesCheckbox = document.getElementById('experiences-checkbox');
experiencesCheckbox.addEventListener('click', () => {
    selectedCopyBlocks.experiences = !selectedCopyBlocks.experiences;
});
const educationsCheckbox = document.getElementById('education-checkbox');
educationsCheckbox.addEventListener('click', () => {
    selectedCopyBlocks.educations = !selectedCopyBlocks.educations;
});
const coursesCheckbox = document.getElementById('courses-checkbox');
coursesCheckbox.addEventListener('click', () => {
    selectedCopyBlocks.courses = !selectedCopyBlocks.courses;
});

// modal buttons listeners
const modalCopyBtn = document.getElementById('modal-copy-btn');
modalCopyBtn.addEventListener('click', () => {
    var copyResume = {};
    copyResume[selectedResumeToCopy] = selectedCopyBlocks;
    localStorage.setItem('reqCopyResume', JSON.stringify(copyResume))
    window.location.href = '/';
});
const modalCloseBtn = document.getElementById('modal-close-btn');
modalCloseBtn.addEventListener('click', () => {
    let modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.style.visibility = 'hidden';
    selectedResumeToCopy = '';
});
