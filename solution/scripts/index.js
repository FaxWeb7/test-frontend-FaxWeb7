var getValidDate = (startDate, endDate) => {
    const startParts = startDate.split('-');
    const endParts = endDate !== '' ? endDate.split('-') : [];
    const months = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    const startMonth = months[parseInt(startParts[1]) - 1];
    const startYear = startParts[0];
    let formattedDate = `${startMonth} ${startYear} г. — `;
    if (startDate == '') {
        const endMonth = months[parseInt(endParts[1]) - 1];
        const endYear = endParts[0];
        formattedDate = `${endMonth} ${endYear} г.`;
    }
    else if (endDate !== '') {
        const endMonth = months[parseInt(endParts[1]) - 1];
        const endYear = endParts[0];
        formattedDate += `${endMonth} ${endYear} г.`;
    } else {
        formattedDate += 'наст. время';
    }

    return formattedDate;
}

// current variables in edit form (state)
var resumeTitle = '';
var fullName = '';
var birthday = '';
var city = '';
var phone = '';
var email = '';
var interests = {};   // {interestUniqueId: interestInputValue}
var languages = {};   // { languageUniqueId: [lang, level] }
var selfDescription = '';
var experiences = {}; //{ experienceUniqueId: [post, startDate, endDate, workPlace, workInformation] }
var educations = {};  //{ educationUniqueId: [education, startDate, endDate, place, info] }
var courses = {};     //{ courseUniqueID: [title, startDate, endDate, organization] }
var reqOpenResume = localStorage.getItem('reqOpenResume'); //check if need to open resume

// main edit form inputs
const resumeTitleInput = document.getElementById('resume_title_input');
const fullNameInput = document.getElementById('flname_input');
const birthdayInput = document.getElementById('birth_input');
const cityInput = document.getElementById('city_input');
const phoneInput = document.getElementById('phone_input');
const emailInput = document.getElementById('email_input');
const interestInput = document.getElementById('interest_input');
const languageInput = document.getElementById('language_input');
const languageLevelInput = document.getElementById('language_level_input');
const selfDescriptionInput = document.getElementById('self_description_input');
const postExperienceInput = document.getElementById('post_input');
const startDateExperienceInput = document.getElementById('work_start_date_input');
const endDateExperienceInput = document.getElementById('work_end_date_input');
const workPlaceExperienceInput = document.getElementById('work_place_input');
const workInformationExperienceInput = document.getElementById('work_information_input');
const educationEducationInput = document.getElementById('education_input');
const startDateEducationInput = document.getElementById('education_start_date_input');
const endDateEducationInput = document.getElementById('education_end_date_input');
const educationPlaceEducationInput = document.getElementById('education_place_input');
const addedInformationEducationInput = document.getElementById('education_addedinformation_input');
const titleCourseInput = document.getElementById('course_title_input');
const startDateCourseInput = document.getElementById('course_start_date_input');
const endDateCourseInput = document.getElementById('course_end_date_input');
const organizationCourseInput = document.getElementById('course_organization_input');

// input listeners on main edit form inputs
resumeTitleInput.addEventListener('input', () => {
    resumeTitle = resumeTitleInput.value;
});
fullNameInput.addEventListener('input', () => {
    fullName = fullNameInput.value;
    let generateBtn = document.getElementById('generate_resume');
    if (fullNameInput.value != ''){
        try { generateBtn.attributes.removeNamedItem('disabled') }
        catch { console.log('hey, bro') }
        generateBtn.setAttribute('enabled', 'true');
    } else {
        generateBtn.setAttribute('disabled', 'true');
    }
});
birthdayInput.addEventListener('input', () => {
    birthday = birthdayInput.value;
});
cityInput.addEventListener('input', () => {
    city = cityInput.value;
});
phoneInput.addEventListener('input', () => {
    phone = phoneInput.value;
});
emailInput.addEventListener('input', () => {
    email = emailInput.value;
});
interestInput.addEventListener('input', () => {
    interests[interestInput.id] = interestInput.value;
});
languageInput.addEventListener('input', () => {
    languages['language_input'] = [languageInput.value, languageLevelInput.value];
});
languageLevelInput.addEventListener('input', () => {
    languages['language_input'] = [languageInput.value, languageLevelInput.value];
});
selfDescriptionInput.addEventListener('input', () => {
    selfDescription = selfDescriptionInput.value;
});
postExperienceInput.addEventListener('input', () => {
    experiences['experience'] = [postExperienceInput.value, startDateExperienceInput.value, endDateExperienceInput.value, workPlaceExperienceInput.value, workInformationExperienceInput.value];
});
startDateExperienceInput.addEventListener('input', () => {
    experiences['experience'] = [postExperienceInput.value, startDateExperienceInput.value, endDateExperienceInput.value, workPlaceExperienceInput.value, workInformationExperienceInput.value];
});
endDateExperienceInput.addEventListener('input', () => {
    experiences['experience'] = [postExperienceInput.value, startDateExperienceInput.value, endDateExperienceInput.value, workPlaceExperienceInput.value, workInformationExperienceInput.value];
});
workPlaceExperienceInput.addEventListener('input', () => {
    experiences['experience'] = [postExperienceInput.value, startDateExperienceInput.value, endDateExperienceInput.value, workPlaceExperienceInput.value, workInformationExperienceInput.value];
});
workInformationExperienceInput.addEventListener('input', () => {
    experiences['experience'] = [postExperienceInput.value, startDateExperienceInput.value, endDateExperienceInput.value, workPlaceExperienceInput.value, workInformationExperienceInput.value];
});
educationEducationInput.addEventListener('input', () => {
    educations['education'] = [educationEducationInput.value, startDateEducationInput.value, endDateEducationInput.value, educationPlaceEducationInput.value, addedInformationEducationInput.value];
});
startDateEducationInput.addEventListener('input', () => {
    educations['education'] = [educationEducationInput.value, startDateEducationInput.value, endDateEducationInput.value, educationPlaceEducationInput.value, addedInformationEducationInput.value];
});
endDateEducationInput.addEventListener('input', () => {
    educations['education'] = [educationEducationInput.value, startDateEducationInput.value, endDateEducationInput.value, educationPlaceEducationInput.value, addedInformationEducationInput.value];
});
educationPlaceEducationInput.addEventListener('input', () => {
    educations['education'] = [educationEducationInput.value, startDateEducationInput.value, endDateEducationInput.value, educationPlaceEducationInput.value, addedInformationEducationInput.value];
});
addedInformationEducationInput.addEventListener('input', () => {
    educations['education'] = [educationEducationInput.value, startDateEducationInput.value, endDateEducationInput.value, educationPlaceEducationInput.value, addedInformationEducationInput.value];
});
titleCourseInput.addEventListener('input', () => {
    courses['course'] = [titleCourseInput.value, startDateCourseInput.value, endDateCourseInput.value, organizationCourseInput.value];
});
startDateCourseInput.addEventListener('input', () => {
    courses['course'] = [titleCourseInput.value, startDateCourseInput.value, endDateCourseInput.value, organizationCourseInput.value];
});
endDateCourseInput.addEventListener('input', () => {
    courses['course'] = [titleCourseInput.value, startDateCourseInput.value, endDateCourseInput.value, organizationCourseInput.value];
});
organizationCourseInput.addEventListener('input', () => {
    courses['course'] = [titleCourseInput.value, startDateCourseInput.value, endDateCourseInput.value, organizationCourseInput.value];
});

// edit form buttons
const addInterestBtn = document.getElementById('add_interest');
const removeInterestBtn = document.getElementById('remove_interest');
const addLanguageBtn = document.getElementById('add_language');
const removeLanguageBtn = document.getElementById('remove_language');
const addExperienceBtn = document.getElementById('add_work_experience');
const removeExperienceBtn = document.getElementById('remove_work_experience');
const addEducationBtn = document.getElementById('add_education');
const removeEducationBtn = document.getElementById('remove_education');
const addCourseBtn = document.getElementById('add_course');
const removeCourseBtn = document.getElementById('remove_course');

// interests buttons listeners
var countInterest = 1;
var checkIntereOne = true;
addInterestBtn.addEventListener('click', () => {
    let reqOpenResume = localStorage.getItem('reqOpenResume');
    if (reqOpenResume && checkIntereOne){
        let curIntsts = JSON.parse(localStorage.getItem(reqOpenResume)).interests;
        countInterest = Object.keys(curIntsts).length;
        checkIntereOne = false;
    }
    let interestsWrapper = document.querySelector('.edit__item.interest-wrapper');
    const newLabel = document.createElement('label');
    const newInput = document.createElement('input');
    newLabel.setAttribute('for', 'interest_input'+countInterest);
    newLabel.textContent = 'Введите текст нового интереса:';
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('id', 'interest_input'+countInterest);
    newInput.setAttribute('test-id', 'interest');
    interestsWrapper.appendChild(newLabel);
    interestsWrapper.appendChild(newInput);

    const newInputInterest = document.getElementById('interest_input'+countInterest);
    newInputInterest.addEventListener('input', () => {
        interests[newInputInterest.id] = newInputInterest.value;
    })
    countInterest++;
});
removeInterestBtn.addEventListener('click', () => {
    let parentNode = document.querySelector('.interest-wrapper');
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    let lastKey = Object.keys(interests)[Object.keys(interests).length - 1];
    delete interests[lastKey];
});

// languages buttons listeners
var countLanguage = 1;
var checkLangOne = true;
addLanguageBtn.addEventListener('click', () => {
    let reqOpenResume = localStorage.getItem('reqOpenResume');
    if (reqOpenResume && checkLangOne){
        let curLangs = JSON.parse(localStorage.getItem(reqOpenResume)).languages;
        countLanguage = Object.keys(curLangs).length;
        checkLangOne = false;
    }
    let languageWrapper = document.querySelector('.edit__item.language-wrapper');
    const newLabelName = document.createElement('label');
    const newInputName = document.createElement('input');
    const newLabelLevel = document.createElement('label');
    const newInputLevel = document.createElement('input');
    newLabelName.setAttribute('for', 'language_input'+countLanguage);
    newLabelName.textContent = 'Введите новый язык:';
    newInputName.setAttribute('type', 'text');
    newInputName.setAttribute('id', 'language_input'+countLanguage);
    newInputName.setAttribute('test-id', 'language-name');
    newLabelLevel.setAttribute('for', 'language_level_input'+countLanguage);
    newLabelLevel.textContent = 'Введите уровень владения новым языком:';
    newInputLevel.setAttribute('type', 'text');
    newInputLevel.setAttribute('id', 'language_level_input'+countLanguage);
    newInputLevel.setAttribute('test-id', 'language-level');
    languageWrapper.appendChild(newLabelName);
    languageWrapper.appendChild(newInputName);
    languageWrapper.appendChild(newLabelLevel);
    languageWrapper.appendChild(newInputLevel);

    const newInputLang = document.getElementById(`language_input${countLanguage}`);
    const newInputLvl = document.getElementById(`language_level_input${countLanguage}`);
    newInputLang.addEventListener('input', () => {
        languages[`language_input${countLanguage}`] = [newInputLang.value, newInputLvl.value];
    });
    newInputLvl.addEventListener('input', () => {
        languages[`language_input${countLanguage}`] = [newInputLang.value, newInputLvl.value];
    });
    countLanguage++;
});
removeLanguageBtn.addEventListener('click', () => {
    let parentNode = document.querySelector('.language-wrapper');
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    let lastKey = Object.keys(languages)[Object.keys(languages).length - 1];
    delete languages[lastKey];
});

// experiences buttons listeners
var countExperience = 1;
var checkExpOne = true;
addExperienceBtn.addEventListener('click', () => {
    let reqOpenResume = localStorage.getItem('reqOpenResume');
    if (reqOpenResume && checkExpOne){
        let curExps = JSON.parse(localStorage.getItem(reqOpenResume)).experiences;
        countExperience = Object.keys(curExps).length;
        checkExpOne = false;
    }
    let experienceWrapper = document.querySelector('.edit__item.experience-wrapper');
    const postLabel = document.createElement('label');
    const postInput = document.createElement('input');
    const startLabel = document.createElement('label');
    const startInput = document.createElement('input');
    const endLabel = document.createElement('label');
    const endInput = document.createElement('input');
    const workLabel = document.createElement('label');
    const workInput = document.createElement('input');
    const infoLabel = document.createElement('label');
    const infoInput = document.createElement('input');
    postLabel.setAttribute('for', 'post_input'+countExperience);
    postLabel.textContent = 'Введите должность:';
    postInput.setAttribute('type', 'text');
    postInput.setAttribute('id', 'post_input'+countExperience);
    postInput.setAttribute('test-id', 'job-title');
    startLabel.setAttribute('for', 'work_start_date_input'+countExperience);
    startLabel.textContent = 'Введите дату начала работы:';
    startInput.setAttribute('type', 'text');
    startInput.setAttribute('id', 'work_start_date_input'+countExperience);
    startInput.setAttribute('test-id', 'job-date-start');
    endLabel.setAttribute('for', 'work_end_date_input'+countExperience);
    endLabel.textContent = 'Введите дату окончания работы:';
    endInput.setAttribute('type', 'text');
    endInput.setAttribute('id', 'work_end_date_input'+countExperience);
    endInput.setAttribute('test-id', 'job-date-end');
    workLabel.setAttribute('for', 'work_place_input'+countExperience);
    workLabel.textContent = 'Введите название места работы:';
    workInput.setAttribute('type', 'text');
    workInput.setAttribute('id', 'work_place_input'+countExperience);
    workInput.setAttribute('test-id', 'job-place');
    infoLabel.setAttribute('for', 'work_information_input'+countExperience);
    infoLabel.textContent = 'Введите чем вы занимались на работе:';
    infoInput.setAttribute('type', 'text');
    infoInput.setAttribute('id', 'work_information_input'+countExperience);
    infoInput.setAttribute('test-id', 'job-description');
    experienceWrapper.appendChild(postLabel);
    experienceWrapper.appendChild(postInput);
    experienceWrapper.appendChild(startLabel);
    experienceWrapper.appendChild(startInput);
    experienceWrapper.appendChild(endLabel);
    experienceWrapper.appendChild(endInput);
    experienceWrapper.appendChild(workLabel);
    experienceWrapper.appendChild(workInput);
    experienceWrapper.appendChild(infoLabel);
    experienceWrapper.appendChild(infoInput);

    const newInputPost = document.getElementById(`post_input${countExperience}`);
    const newInputStart = document.getElementById(`work_start_date_input${countExperience}`);
    const newInputEnd = document.getElementById(`work_end_date_input${countExperience}`);
    const newInputWork = document.getElementById(`work_place_input${countExperience}`);
    const newInputInfo = document.getElementById(`work_information_input${countExperience}`);
    newInputPost.addEventListener('input', () => {
        experiences[`experience${countExperience}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    newInputStart.addEventListener('input', () => {
        experiences[`experience${countExperience}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    newInputEnd.addEventListener('input', () => {
        experiences[`experience${countExperience}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    newInputWork.addEventListener('input', () => {
        experiences[`experience${countExperience}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    newInputInfo.addEventListener('input', () => {
        experiences[`experience${countExperience}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    countExperience++;
});
removeExperienceBtn.addEventListener('click', () => {
    let parentNode = document.querySelector('.experience-wrapper');
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    let lastKey = Object.keys(experiences)[Object.keys(experiences).length - 1];
    delete experiences[lastKey];
});

// educations buttons listeners
countEducation = 1;
var checkEduc = true;
addEducationBtn.addEventListener('click', () => {
    let reqOpenResume = localStorage.getItem('reqOpenResume');
    if (reqOpenResume && checkEduc){
        let curEduc = JSON.parse(localStorage.getItem(reqOpenResume)).educations;
        countEducation = Object.keys(curEduc).length;
        checkEduc = false;
    }
    let educationWrapper = document.querySelector('.edit__item.education-wrapper');
    const postLabel = document.createElement('label');
    const postInput = document.createElement('input');
    const startLabel = document.createElement('label');
    const startInput = document.createElement('input');
    const endLabel = document.createElement('label');
    const endInput = document.createElement('input');
    const workLabel = document.createElement('label');
    const workInput = document.createElement('input');
    const infoLabel = document.createElement('label');
    const infoInput = document.createElement('input');
    postLabel.setAttribute('for', 'education_input'+countEducation);
    postLabel.textContent = 'Введите высшее образование:';
    postInput.setAttribute('type', 'text');
    postInput.setAttribute('id', 'education_input'+countEducation);
    postInput.setAttribute('test-id', 'education-title');
    startLabel.setAttribute('for', 'education_start_date_input'+countEducation);
    startLabel.textContent = 'Введите дату начала обучения:';
    startInput.setAttribute('type', 'text');
    startInput.setAttribute('id', 'education_start_date_input'+countEducation);
    startInput.setAttribute('test-id', 'education-date-start');
    endLabel.setAttribute('for', 'education_end_date_input'+countEducation);
    endLabel.textContent = 'Введите дату окончания обучения:';
    endInput.setAttribute('type', 'text');
    endInput.setAttribute('id', 'education_end_date_input'+countEducation);
    endInput.setAttribute('test-id', 'education-date-end');
    workLabel.setAttribute('for', 'education_place_input'+countEducation);
    workLabel.textContent = 'Введите название места обучения:';
    workInput.setAttribute('type', 'text');
    workInput.setAttribute('id', 'education_place_input'+countEducation);
    workInput.setAttribute('test-id', 'education-place');
    infoLabel.setAttribute('for', 'education_addedinformation_input'+countEducation);
    infoLabel.textContent = 'Введите дополнительную информацию об учебе:';
    infoInput.setAttribute('type', 'text');
    infoInput.setAttribute('id', 'education_addedinformation_input'+countEducation);
    infoInput.setAttribute('test-id', 'education-description');
    educationWrapper.appendChild(postLabel);
    educationWrapper.appendChild(postInput);
    educationWrapper.appendChild(startLabel);
    educationWrapper.appendChild(startInput);
    educationWrapper.appendChild(endLabel);
    educationWrapper.appendChild(endInput);
    educationWrapper.appendChild(workLabel);
    educationWrapper.appendChild(workInput);
    educationWrapper.appendChild(infoLabel);
    educationWrapper.appendChild(infoInput);

    const newInputPost = document.getElementById(`education_input${countEducation}`);
    const newInputStart = document.getElementById(`education_start_date_input${countEducation}`);
    const newInputEnd = document.getElementById(`education_end_date_input${countEducation}`);
    const newInputWork = document.getElementById(`education_place_input${countEducation}`);
    const newInputInfo = document.getElementById(`education_addedinformation_input${countEducation}`);
    newInputPost.addEventListener('input', () => {
        educations[`education${countEducation}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    newInputStart.addEventListener('input', () => {
        educations[`education${countEducation}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    newInputEnd.addEventListener('input', () => {
        educations[`education${countEducation}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    newInputWork.addEventListener('input', () => {
        educations[`education${countEducation}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    newInputInfo.addEventListener('input', () => {
        educations[`education${countEducation}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
    });
    countEducation++;
});
removeEducationBtn.addEventListener('click', () => {
    let parentNode = document.querySelector('.education-wrapper');
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    let lastKey = Object.keys(educations)[Object.keys(educations).length - 1];
    delete educations[lastKey];
});

// courses buttons listeners
countCourse = 1;
var checkCour = true;
addCourseBtn.addEventListener('click', () => {
    let reqOpenResume = localStorage.getItem('reqOpenResume');
    if (reqOpenResume && checkCour){
        let curCour = JSON.parse(localStorage.getItem(reqOpenResume)).courses;
        countCourse = Object.keys(curCour).length;
        checkCour = false;
    }
    let courseWrapper = document.querySelector('.edit__item.course-wrapper');
    const postLabel = document.createElement('label');
    const postInput = document.createElement('input');
    const startLabel = document.createElement('label');
    const startInput = document.createElement('input');
    const endLabel = document.createElement('label');
    const endInput = document.createElement('input');
    const workLabel = document.createElement('label');
    const workInput = document.createElement('input');
    postLabel.setAttribute('for', 'course_title_input'+countCourse);
    postLabel.textContent = 'Введите название курса:';
    postInput.setAttribute('type', 'text');
    postInput.setAttribute('id', 'course_title_input'+countCourse);
    postInput.setAttribute('test-id', 'course-title');
    startLabel.setAttribute('for', 'course_start_date_input'+countCourse);
    startLabel.textContent = 'Введите дату начала прохождения:';
    startInput.setAttribute('type', 'text');
    startInput.setAttribute('id', 'course_start_date_input'+countCourse);
    startInput.setAttribute('test-id', 'course-date-start');
    endLabel.setAttribute('for', 'course_end_date_input'+countCourse);
    endLabel.textContent = 'Введите дату окончания прохождения:';
    endInput.setAttribute('type', 'text');
    endInput.setAttribute('id', 'course_end_date_input'+countCourse);
    endInput.setAttribute('test-id', 'course-date-end');
    workLabel.setAttribute('for', 'course_organization_input'+countCourse);
    workLabel.textContent = 'Введите название организации курса:';
    workInput.setAttribute('type', 'text');
    workInput.setAttribute('id', 'course_organization_input'+countCourse);
    workInput.setAttribute('test-id', 'course-place');
    courseWrapper.appendChild(postLabel);
    courseWrapper.appendChild(postInput);
    courseWrapper.appendChild(startLabel);
    courseWrapper.appendChild(startInput);
    courseWrapper.appendChild(endLabel);
    courseWrapper.appendChild(endInput);
    courseWrapper.appendChild(workLabel);
    courseWrapper.appendChild(workInput);

    const newInputPost = document.getElementById(`course_title_input${countCourse}`);
    const newInputStart = document.getElementById(`course_start_date_input${countCourse}`);
    const newInputEnd = document.getElementById(`course_end_date_input${countCourse}`);
    const newInputWork = document.getElementById(`course_organization_input${countCourse}`);
    newInputPost.addEventListener('input', () => {
        courses[`course${countCourse}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
    });
    newInputStart.addEventListener('input', () => {
        courses[`course${countCourse}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
    });
    newInputEnd.addEventListener('input', () => {
        courses[`course${countCourse}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
    });
    newInputWork.addEventListener('input', () => {
        courses[`course${countCourse}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
    });
    countCourse++;
});
removeCourseBtn.addEventListener('click', () => {
    let parentNode = document.querySelector('.course-wrapper');
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    parentNode.lastChild.remove();
    let lastKey = Object.keys(courses)[Object.keys(courses).length - 1];
    delete courses[lastKey];
});

// interaction between edit resume page and show resume page
const generateBtn = document.getElementById('generate_resume');
const backBtn = document.getElementById('back_btn');
const resumeContainer = document.getElementById('resume_page');
const editResumeContainer = document.getElementById('edit_resume_page');

// request to open resume
var reqOpenResume = localStorage.getItem('reqOpenResume');
if (reqOpenResume){
    editResumeContainer.classList.add('invis');
    resumeContainer.classList.remove('invis');
    
    var storageResumeTitle = reqOpenResume;
    const fullNameText = document.getElementById('full_name_text');
    const fullNameTextRight = document.querySelector('.main__title');
    var storageFullName = JSON.parse(localStorage.getItem(reqOpenResume))['fullName'];
    fullNameText.textContent = storageFullName;
    fullNameTextRight.textContent = storageFullName;

    var storageBirthday = JSON.parse(localStorage.getItem(reqOpenResume)).birthday;
    const birthdayWrapper = document.getElementById('birth');
    if (!storageBirthday) {
        birthdayWrapper.classList.add('invis');
    } else {
        const birthdayText = document.getElementById('birthday_text');
        birthdayWrapper.classList.remove('invis');
        var bday = storageBirthday.split('-');
        birthdayText.textContent = bday[2]+'.'+bday[1]+'.'+bday[0];
    }

    var storageCity = JSON.parse(localStorage.getItem(reqOpenResume)).city;
    const cityWraper = document.getElementById('city');
    if (!storageCity){
        cityWraper.classList.add('invis');
    } else {
        const cityText = document.getElementById('city_text');
        cityWraper.classList.remove('invis');
        cityText.textContent = storageCity;
    }

    var storagePhone = JSON.parse(localStorage.getItem(reqOpenResume)).phone;
    const phoneWraper = document.getElementById('phone');
    if (!storagePhone){
        phoneWraper.classList.add('invis');
    } else {
        const phoneText = document.getElementById('phone_text');
        phoneWraper.classList.remove('invis');
        phoneText.textContent = storagePhone;
    }

    var storageEmail = JSON.parse(localStorage.getItem(reqOpenResume)).email;
    const emailWraper = document.getElementById('email');
    if (!storageEmail){
        emailWraper.classList.add('invis');
    } else {
        const emailText = document.getElementById('email_text');
        emailWraper.classList.remove('invis');
        emailText.textContent = storageEmail;
    }
    
    var storageInterests = JSON.parse(localStorage.getItem(reqOpenResume)).interests;
    const interestsULWrapper = document.querySelector('.nav__data#interests');
    var isIntersts = false;
    for (let key in storageInterests){
        if (storageInterests[key] != '') {
            isIntersts = true;
            break;
        }
    }
    if (!isIntersts){
        interestsULWrapper.classList.add('invis');
        if (interestsULWrapper.attributes.getNamedItem('test-id')){
            interestsULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        interestsULWrapper.lastChild.remove();
        interestsULWrapper.classList.remove('invis');
        interestsULWrapper.setAttribute('test-id', 'resume-main-section');
        const interestsUL = document.createElement('ul');
        interestsUL.classList.add('nav__data-list');
        interestsUL.classList.add('interests');
        interestsULWrapper.appendChild(interestsUL);
        for (let key in storageInterests){
            let newInterest = document.createElement('h3');
            newInterest.classList.add('nav__data-item');
            newInterest.classList.add('interests');
            newInterest.textContent = storageInterests[key];
            interestsUL.appendChild(newInterest);
        }
    }

    var storageLanguages = JSON.parse(localStorage.getItem(reqOpenResume)).languages;
    const languagesULWrapper = document.querySelector('.nav__data#languages');
    var isLanguages = false;
    for (let key in storageLanguages){
        if (storageLanguages[key][0] != '' && storageLanguages[key][1] != '') {
            isLanguages = true;
            break;
        }
    }
    if (!isLanguages){
        languagesULWrapper.classList.add('invis');
        if (languagesULWrapper.attributes.getNamedItem('test-id')){
            languagesULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        languagesULWrapper.lastChild.remove();
        languagesULWrapper.classList.remove('invis');
        languagesULWrapper.setAttribute('test-id', 'resume-main-section');
        const languagesUL = document.createElement('ul');
        languagesUL.classList.add('nav__data-list');
        languagesUL.classList.add('languages');
        languagesULWrapper.appendChild(languagesUL);
        for (let langList in storageLanguages){
            if (!storageLanguages[langList][0] || !storageLanguages[langList][1]){
                continue;
            }
            let newLanguageDiv = document.createElement('div');
            newLanguageDiv.classList.add('nav__data-item');
            newLanguageDiv.classList.add('languages');
            let newLanguageLang = document.createElement('h3');
            newLanguageLang.classList.add('nav__data-itemtext');
            newLanguageLang.textContent = storageLanguages[langList][0];
            let newLanguageLevel = document.createElement('p');
            newLanguageLevel.classList.add('nav__data-itemdata');
            newLanguageLevel.textContent = storageLanguages[langList][1];
            newLanguageDiv.appendChild(newLanguageLang);
            newLanguageDiv.appendChild(newLanguageLevel);
            languagesUL.appendChild(newLanguageDiv);
        }
    }

    var storageSelfDescription = JSON.parse(localStorage.getItem(reqOpenResume)).selfDescription;
    const selfDescriptionWrapper = document.querySelector('.main__data#description');

    if (!storageSelfDescription){
        selfDescriptionWrapper.classList.add('invis');
    } else {
        const selfDescriptionText = document.querySelector('.main__data-description');
        selfDescriptionWrapper.classList.remove('invis');
        selfDescriptionText.textContent = storageSelfDescription;
    }

    var storageExperiences = JSON.parse(localStorage.getItem(reqOpenResume)).experiences;
    const experienceULWrapper = document.getElementById('work');
    var isExperience = false;
    for (let key in storageExperiences){
        if (storageExperiences[key][0] != '') {
            isExperience = true;
            break;
        }
    }
    if (!isExperience){
        experienceULWrapper.classList.add('invis');
        if (experienceULWrapper.attributes.getNamedItem('test-id')){
            experienceULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        var unsortedStorageExperiences = storageExperiences;
        var sortedExperiences = Object.entries(storageExperiences).sort(([, a], [, b]) => {
            const dateA = a[1] ? new Date(a[1]) : new Date('9999-12-31');
            const dateB = b[1] ? new Date(b[1]) : new Date('9999-12-31');
            if (a[2] === '' && b[2] !== '') {
                return -1;
            } else if (a[2] !== '' && b[2] === '') {
                return 1;
            } else {
                return dateB - dateA;
            }
        });
        storageExperiences = Object.fromEntries(sortedExperiences);
        experienceULWrapper.lastChild.remove();
        experienceULWrapper.classList.remove('invis');
        experienceULWrapper.setAttribute('test-id', 'resume-main-section');
        const experienceUL = document.createElement('ul');
        experienceUL.classList.add('main__data-list');
        experienceULWrapper.appendChild(experienceUL);
        for (let experienceList in storageExperiences){
            if (!storageExperiences[experienceList][0]){
                continue;
            }
            let newExperienceDiv = document.createElement('div');
            newExperienceDiv.classList.add('main__data-item');

            let newContainerDiv = document.createElement('div');
            newContainerDiv.classList.add('main__data-item-container');
            
            let newContainerWraper = document.createElement('div');
            newContainerWraper.classList.add('main__data-item-titlewrapper');
            let newContainerTitle = document.createElement('h3');
            newContainerTitle.classList.add('main__data-item-title');
            newContainerTitle.textContent = storageExperiences[experienceList][0];
            let newContainerCompany = document.createElement('h4');
            newContainerCompany.classList.add('main__data-item-description');
            newContainerCompany.textContent = storageExperiences[experienceList][3];
            newContainerWraper.appendChild(newContainerTitle);
            newContainerWraper.appendChild(newContainerCompany);

            let newContainerDate = document.createElement('p');
            newContainerDate.classList.add('main__data-item-date');
            newContainerDate.style.visibility = storageExperiences[experienceList][1] != '' ? 'visible' : 'hidden';
            newContainerDate.textContent = getValidDate(storageExperiences[experienceList][1], storageExperiences[experienceList][2]);

            newContainerDiv.appendChild(newContainerWraper);
            newContainerDiv.appendChild(newContainerDate);

            let newItemText = document.createElement('p');
            newItemText.classList.add('main__data-item-text');
            newItemText.textContent = storageExperiences[experienceList][4];

            newExperienceDiv.appendChild(newContainerDiv);
            newExperienceDiv.appendChild(newItemText);

            experienceUL.appendChild(newExperienceDiv);
        }
    }

    var storageEducation = JSON.parse(localStorage.getItem(reqOpenResume)).educations;
    const educationULWrapper = document.getElementById('education');
    var isEducation = false;
    for (let key in storageEducation){
        if (storageEducation[key][0] != '') {
            isEducation = true;
            break;
        }
    }
    if (!isEducation){
        educationULWrapper.classList.add('invis');
        if (educationULWrapper.attributes.getNamedItem('test-id')){
            educationULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        var unsortedStorageEducation = storageEducation
        var sortedEducations = Object.entries(storageEducation).sort(([, a], [, b]) => {
            const dateA = a[1] ? new Date(a[1]) : new Date('9999-12-31');
            const dateB = b[1] ? new Date(b[1]) : new Date('9999-12-31');
            if (a[2] === '' && b[2] !== '') {
                return -1;
            } else if (a[2] !== '' && b[2] === '') {
                return 1;
            } else {
                return dateB - dateA;
            }
        });
        storageEducation = Object.fromEntries(sortedEducations);
        educationULWrapper.lastChild.remove();
        educationULWrapper.classList.remove('invis');
        educationULWrapper.setAttribute('test-id', 'resume-main-section');
        const educationUL = document.createElement('ul');
        educationUL.classList.add('main__data-list');
        educationULWrapper.appendChild(educationUL);
        for (let educationList in storageEducation){
            if (!storageEducation[educationList][0]){
                continue;
            }
            let newExperienceDiv = document.createElement('div');
            newExperienceDiv.classList.add('main__data-item');

            let newContainerDiv = document.createElement('div');
            newContainerDiv.classList.add('main__data-item-container');
            
            let newContainerWraper = document.createElement('div');
            newContainerWraper.classList.add('main__data-item-titlewrapper');
            let newContainerTitle = document.createElement('h3');
            newContainerTitle.classList.add('main__data-item-title');
            newContainerTitle.textContent = storageEducation[educationList][0];
            let newContainerCompany = document.createElement('h4');
            newContainerCompany.classList.add('main__data-item-description');
            newContainerCompany.textContent = storageEducation[educationList][3];
            newContainerWraper.appendChild(newContainerTitle);
            newContainerWraper.appendChild(newContainerCompany);

            let newContainerDate = document.createElement('p');
            newContainerDate.classList.add('main__data-item-date');
            newContainerDate.style.visibility = storageEducation[educationList][1] != '' ? 'visible' : 'hidden';
            newContainerDate.textContent = getValidDate(storageEducation[educationList][1], storageEducation[educationList][2]);

            newContainerDiv.appendChild(newContainerWraper);
            newContainerDiv.appendChild(newContainerDate);

            let newItemText = document.createElement('p');
            newItemText.classList.add('main__data-item-text');
            newItemText.textContent = storageEducation[educationList][4];

            newExperienceDiv.appendChild(newContainerDiv);
            newExperienceDiv.appendChild(newItemText);

            educationUL.appendChild(newExperienceDiv);
        }
    }

    var storageCourses = JSON.parse(localStorage.getItem(reqOpenResume)).courses;
    const coursesULWrapper = document.getElementById('courses');
    var isCourses = false;
    for (let key in storageCourses){
        if (storageCourses[key][0] != '') {
            isCourses = true;
            break;
        }
    }
    if (!isCourses){
        coursesULWrapper.classList.add('invis');
        if (coursesULWrapper.attributes.getNamedItem('test-id')){
            coursesULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        var unsortedStorageCourses = storageCourses;
        var sortedCourses = Object.entries(storageCourses).sort(([, a], [, b]) => {
            const dateA = a[1] ? new Date(a[1]) : new Date('9999-12-31');
            const dateB = b[1] ? new Date(b[1]) : new Date('9999-12-31');
            if (a[2] === '' && b[2] !== '') {
                return -1;
            } else if (a[2] !== '' && b[2] === '') {
                return 1;
            } else {
                return dateB - dateA;
            }
        });
        storageCourses = Object.fromEntries(sortedCourses);
        coursesULWrapper.lastChild.remove();
        coursesULWrapper.classList.remove('invis');
        coursesULWrapper.setAttribute('test-id', 'resume-main-section');
        const coursesUL = document.createElement('ul');
        coursesUL.classList.add('main__data-list');
        coursesULWrapper.appendChild(coursesUL);
        for (let courseList in storageCourses){
            if (!storageCourses[courseList][0]){
                continue;
            }
            let newExperienceDiv = document.createElement('div');
            newExperienceDiv.classList.add('main__data-item');

            let newContainerDiv = document.createElement('div');
            newContainerDiv.classList.add('main__data-item-container');
            
            let newContainerWraper = document.createElement('div');
            newContainerWraper.classList.add('main__data-item-titlewrapper');
            let newContainerTitle = document.createElement('h3');
            newContainerTitle.classList.add('main__data-item-title');
            newContainerTitle.textContent = storageCourses[courseList][0];
            let newContainerCompany = document.createElement('h4');
            newContainerCompany.classList.add('main__data-item-description');
            newContainerCompany.textContent = storageCourses[courseList][3];
            newContainerWraper.appendChild(newContainerTitle);
            newContainerWraper.appendChild(newContainerCompany);

            let newContainerDate = document.createElement('p');
            newContainerDate.classList.add('main__data-item-date');
            newContainerDate.style.visibility = storageCourses[courseList][1] != '' ? 'visible' : 'hidden';
            newContainerDate.textContent = getValidDate(storageCourses[courseList][1], storageCourses[courseList][2]);

            newContainerDiv.appendChild(newContainerWraper);
            newContainerDiv.appendChild(newContainerDate);

            newExperienceDiv.appendChild(newContainerDiv);

            coursesUL.appendChild(newExperienceDiv);
        }
    }
}

// request to copy resume
var reqCopyResume = localStorage.getItem('reqCopyResume');
if (reqCopyResume){
    let copyResume = JSON.parse(localStorage.getItem(Object.keys(JSON.parse(reqCopyResume))[0]));
    var copyList = JSON.parse(reqCopyResume)[Object.keys(JSON.parse(reqCopyResume))[0]];
    if (copyList.personalData){
        let resumeFullName = document.getElementById('flname_input');
        resumeFullName.value = copyResume.fullName;
        fullName = copyResume.fullName;

        let resumeBirth = document.getElementById('birth_input');
        resumeBirth.value = copyResume.birthday;
        birthday = copyResume.birthday;

        let resumeCity = document.getElementById('city_input');
        resumeCity.value = copyResume.city;
        city = copyResume.city;

        let resumePhone = document.getElementById('phone_input');
        resumePhone.value = copyResume.phone;
        phone = copyResume.phone;

        let resumeEmail = document.getElementById('email_input');
        resumeEmail.value = copyResume.email;
        email = copyResume.email;
    } 
    if (document.getElementById('flname_input').value != ''){
        generateBtn.attributes.removeNamedItem('disabled');
        generateBtn.setAttribute('enabled', 'true');
    }

    if (copyList.interests){
        interests = copyResume.interests;
        let interestsKeys = Object.keys(copyResume.interests);
        if (interestsKeys.length != 0){
            var interInput = document.getElementById('interest_input');
            interInput.value = interests[interestsKeys[0]];
            
            let interestsWrapper = document.querySelector('.interest-wrapper');
            for (let i = 1; i < interestsKeys.length; i++){
                let newInterLabel = document.createElement('label');
                newInterLabel.textContent = 'Введите текст нового интереса:'
                newInterLabel.setAttribute('for', 'interest_input'+i)
                let newInterInput = document.createElement('input');
                newInterInput.value = interests[interestsKeys[i]];
                newInterInput.setAttribute('type', 'text');
                newInterInput.setAttribute('id', 'interest_input'+i);
                newInterInput.setAttribute('test-id', 'interest');
                interestsWrapper.appendChild(newInterLabel);
                interestsWrapper.appendChild(newInterInput);

                const newInter = document.getElementById('interest_input'+i);
                newInter.addEventListener('input', () => {
                    interests['interest_input'+i] = newInter.value;
                })
            }
        }
    }

    if (copyList.languages){
        languages = copyResume.languages;
        storageLanguages = copyResume.languages;
        var languageKeys = Object.keys(storageLanguages);
        if (languageKeys.length != 0){
            languages = storageLanguages;
            var langInput = document.getElementById('language_input');
            langInput.value = storageLanguages[languageKeys[0]][0];
            var langLvl = document.getElementById('language_level_input');
            langLvl.value = storageLanguages[languageKeys[0]][1];
            
            let languageWrapper = document.querySelector('.language-wrapper');
            for (let i = 1; i < languageKeys.length; i++){
                let newLabelName = document.createElement('label');
                let newInputName = document.createElement('input');
                let newLabelLevel = document.createElement('label');
                let newInputLevel = document.createElement('input');
                newLabelName.setAttribute('for', 'language_input'+i);
                newLabelName.textContent = 'Введите новый язык:';
                newInputName.setAttribute('type', 'text');
                newInputName.setAttribute('id', 'language_input'+i);
                newInputName.setAttribute('test-id', 'language-name');
                newInputName.value = storageLanguages[languageKeys[i]][0];
                newLabelLevel.setAttribute('for', 'language_level_input'+i);
                newLabelLevel.textContent = 'Введите уровень владения новым языком:';
                newInputLevel.setAttribute('type', 'text');
                newInputLevel.setAttribute('id', 'language_level_input'+i);
                newInputLevel.setAttribute('test-id', 'language-level');
                newInputLevel.value = storageLanguages[languageKeys[i]][1];
                languageWrapper.appendChild(newLabelName);
                languageWrapper.appendChild(newInputName);
                languageWrapper.appendChild(newLabelLevel);
                languageWrapper.appendChild(newInputLevel);

                let newInputLang = document.getElementById(`language_input${i}`);
                let newInputLvl = document.getElementById(`language_level_input${i}`);
                newInputLang.addEventListener('input', () => {
                    languages[`language_input${i}`] = [newInputLang.value, newInputLvl.value];
                });
                newInputLvl.addEventListener('input', () => {
                    languages[`language_input${i}`] = [newInputLang.value, newInputLvl.value];
                });
            }
        }
    }

    if (copyList.selfDescription){
        selfDescription = copyResume.selfDescription;
        storageSelfDescription = copyResume.selfDescription;
        var selfDescVal = document.getElementById('self_description_input');
        selfDescVal.value = copyResume.selfDescription;
    }

    if (copyList.experiences){
        experiences = copyResume.experiences;
        storageExperiences = copyResume.experiences;
        unsortedStorageExperiences = copyResume.experiences;
        var experienceKeys = Object.keys(copyResume.experiences);
        if (experienceKeys.length != 0){
            experiences = unsortedStorageExperiences;
            var postinput = document.getElementById('post_input');
            postinput.value = unsortedStorageExperiences[experienceKeys[0]][0];
            var startinput = document.getElementById('work_start_date_input');
            startinput.value = unsortedStorageExperiences[experienceKeys[0]][1];
            var endinput = document.getElementById('work_end_date_input');
            endinput.value = unsortedStorageExperiences[experienceKeys[0]][2];
            var placeinput = document.getElementById('work_place_input');
            placeinput.value = unsortedStorageExperiences[experienceKeys[0]][3];
            var infoinput = document.getElementById('work_information_input');
            infoinput.value = unsortedStorageExperiences[experienceKeys[0]][4];
            
            let experienceWrapper = document.querySelector('.experience-wrapper');
            for (let i = 1; i < experienceKeys.length; i++){
                let postLabel = document.createElement('label');
                let postInput = document.createElement('input');
                let startLabel = document.createElement('label');
                let startInput = document.createElement('input');
                let endLabel = document.createElement('label');
                let endInput = document.createElement('input');
                let workLabel = document.createElement('label');
                let workInput = document.createElement('input');
                let infoLabel = document.createElement('label');
                let infoInput = document.createElement('input');
                postLabel.setAttribute('for', 'post_input'+i);
                postLabel.textContent = 'Введите должность:';
                postInput.setAttribute('type', 'text');
                postInput.setAttribute('id', 'post_input'+i);
                postInput.setAttribute('test-id', 'job-title');
                postInput.value = unsortedStorageExperiences[experienceKeys[i]][0];
                startLabel.setAttribute('for', 'work_start_date_input'+i);
                startLabel.textContent = 'Введите дату начала работы:';
                startInput.setAttribute('type', 'text');
                startInput.setAttribute('id', 'work_start_date_input'+i);
                startInput.setAttribute('test-id', 'job-date-start');
                startInput.value = unsortedStorageExperiences[experienceKeys[i]][1];
                endLabel.setAttribute('for', 'work_end_date_input'+i);
                endLabel.textContent = 'Введите дату окончания работы:';
                endInput.setAttribute('type', 'text');
                endInput.setAttribute('id', 'work_end_date_input'+i);
                endInput.setAttribute('test-id', 'job-date-end');
                endInput.value = unsortedStorageExperiences[experienceKeys[i]][2];
                workLabel.setAttribute('for', 'work_place_input'+i);
                workLabel.textContent = 'Введите название места работы:';
                workInput.setAttribute('type', 'text');
                workInput.setAttribute('id', 'work_place_input'+i);
                workInput.setAttribute('test-id', 'job-place');
                workInput.value = unsortedStorageExperiences[experienceKeys[i]][3];
                infoLabel.setAttribute('for', 'work_information_input'+i);
                infoLabel.textContent = 'Введите чем вы занимались на работе:';
                infoInput.setAttribute('type', 'text');
                infoInput.setAttribute('id', 'work_information_input'+i);
                infoInput.setAttribute('test-id', 'job-description');
                infoInput.value = unsortedStorageExperiences[experienceKeys[i]][4];
                experienceWrapper.appendChild(postLabel);
                experienceWrapper.appendChild(postInput);
                experienceWrapper.appendChild(startLabel);
                experienceWrapper.appendChild(startInput);
                experienceWrapper.appendChild(endLabel);
                experienceWrapper.appendChild(endInput);
                experienceWrapper.appendChild(workLabel);
                experienceWrapper.appendChild(workInput);
                experienceWrapper.appendChild(infoLabel);
                experienceWrapper.appendChild(infoInput);

                let newInputPost = document.getElementById(`post_input${i}`);
                let newInputStart = document.getElementById(`work_start_date_input${i}`);
                let newInputEnd = document.getElementById(`work_end_date_input${i}`);
                let newInputWork = document.getElementById(`work_place_input${i}`);
                let newInputInfo = document.getElementById(`work_information_input${i}`);
                newInputPost.addEventListener('input', () => {
                    experiences[`experience${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
                newInputStart.addEventListener('input', () => {
                    experiences[`experience${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
                newInputEnd.addEventListener('input', () => {
                    experiences[`experience${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
                newInputWork.addEventListener('input', () => {
                    experiences[`experience${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
                newInputInfo.addEventListener('input', () => {
                    experiences[`experience${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
            }
        }
    }

    if (copyList.educations){
        educations = copyResume.educations;
        storageEducation = copyResume.educations;
        unsortedStorageEducation = copyResume.educations;
        var educationKeys = Object.keys(unsortedStorageEducation);
        if (educationKeys.length != 0){
            educations = unsortedStorageEducation;
            var postinput = document.getElementById('education_input');
            postinput.value = unsortedStorageEducation[educationKeys[0]][0];
            var startinput = document.getElementById('education_start_date_input');
            startinput.value = unsortedStorageEducation[educationKeys[0]][1];
            var endinput = document.getElementById('education_end_date_input');
            endinput.value = unsortedStorageEducation[educationKeys[0]][2];
            var placeinput = document.getElementById('education_place_input');
            placeinput.value = unsortedStorageEducation[educationKeys[0]][3];
            var infoinput = document.getElementById('education_addedinformation_input');
            infoinput.value = unsortedStorageEducation[educationKeys[0]][4];
            
            let educationWrapper = document.querySelector('.education-wrapper');
            for (let i = 1; i < educationKeys.length; i++){
                let postLabel = document.createElement('label');
                let postInput = document.createElement('input');
                let startLabel = document.createElement('label');
                let startInput = document.createElement('input');
                let endLabel = document.createElement('label');
                let endInput = document.createElement('input');
                let workLabel = document.createElement('label');
                let workInput = document.createElement('input');
                let infoLabel = document.createElement('label');
                let infoInput = document.createElement('input');
                postLabel.setAttribute('for', 'education_input'+i);
                postLabel.textContent = 'Введите высшее образование:';
                postInput.setAttribute('type', 'text');
                postInput.setAttribute('id', 'education_input'+i);
                postInput.setAttribute('test-id', 'education-title');
                postInput.value = unsortedStorageEducation[educationKeys[i]][0];
                startLabel.setAttribute('for', 'education_start_date_input'+i);
                startLabel.textContent = 'Введите дату начала обучения:';
                startInput.setAttribute('type', 'text');
                startInput.setAttribute('id', 'education_start_date_input'+i);
                startInput.setAttribute('test-id', 'education-date-start');
                startInput.value = unsortedStorageEducation[educationKeys[i]][1];
                endLabel.setAttribute('for', 'education_end_date_input'+i);
                endLabel.textContent = 'Введите дату окончания обучения:';
                endInput.setAttribute('type', 'text');
                endInput.setAttribute('id', 'education_end_date_input'+i);
                endInput.setAttribute('test-id', 'education-date-end');
                endInput.value = unsortedStorageEducation[educationKeys[i]][2];
                workLabel.setAttribute('for', 'education_place_input'+i);
                workLabel.textContent = 'Введите название места обучения:';
                workInput.setAttribute('type', 'text');
                workInput.setAttribute('id', 'education_place_input'+i);
                workInput.setAttribute('test-id', 'education-place');
                workInput.value = unsortedStorageEducation[educationKeys[i]][3];
                infoLabel.setAttribute('for', 'education_addedinformation_input'+i);
                infoLabel.textContent = 'Введите дополнительную информацию об учебе:';
                infoInput.setAttribute('type', 'text');
                infoInput.setAttribute('id', 'education_addedinformation_input'+i);
                infoInput.setAttribute('test-id', 'education-description');
                infoInput.value = unsortedStorageEducation[educationKeys[i]][4];
                educationWrapper.appendChild(postLabel);
                educationWrapper.appendChild(postInput);
                educationWrapper.appendChild(startLabel);
                educationWrapper.appendChild(startInput);
                educationWrapper.appendChild(endLabel);
                educationWrapper.appendChild(endInput);
                educationWrapper.appendChild(workLabel);
                educationWrapper.appendChild(workInput);
                educationWrapper.appendChild(infoLabel);
                educationWrapper.appendChild(infoInput);

                let newInputPost = document.getElementById(`education_input${i}`);
                let newInputStart = document.getElementById(`education_start_date_input${i}`);
                let newInputEnd = document.getElementById(`education_end_date_input${i}`);
                let newInputWork = document.getElementById(`education_place_input${i}`);
                let newInputInfo = document.getElementById(`education_addedinformation_input${i}`);
                newInputPost.addEventListener('input', () => {
                    educations[`education${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
                newInputStart.addEventListener('input', () => {
                    educations[`education${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
                newInputEnd.addEventListener('input', () => {
                    educations[`education${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
                newInputWork.addEventListener('input', () => {
                    educations[`education${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
                newInputInfo.addEventListener('input', () => {
                    educations[`education${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
                });
            }
        }
    }

    if (copyList.courses){
        courses = copyResume.courses;
        storageCourses = copyResume.courses;
        unsortedStorageCourses = copyResume.courses;
        var coursesKeys = Object.keys(unsortedStorageCourses);
        if (coursesKeys.length != 0){
            courses = unsortedStorageCourses;
            var postinput = document.getElementById('course_title_input');
            postinput.value = unsortedStorageCourses[coursesKeys[0]][0];
            var startinput = document.getElementById('course_start_date_input');
            startinput.value = unsortedStorageCourses[coursesKeys[0]][1];
            var endinput = document.getElementById('course_end_date_input');
            endinput.value = unsortedStorageCourses[coursesKeys[0]][2];
            var placeinput = document.getElementById('course_organization_input');
            placeinput.value = unsortedStorageCourses[coursesKeys[0]][3];
            
            let courseWrapper = document.querySelector('.course-wrapper');
            for (let i = 1; i < coursesKeys.length; i++){
                let postLabel = document.createElement('label');
                let postInput = document.createElement('input');
                let startLabel = document.createElement('label');
                let startInput = document.createElement('input');
                let endLabel = document.createElement('label');
                let endInput = document.createElement('input');
                let workLabel = document.createElement('label');
                let workInput = document.createElement('input');
                postLabel.setAttribute('for', 'course_title_input'+i);
                postLabel.textContent = 'Введите название курса:';
                postInput.setAttribute('type', 'text');
                postInput.setAttribute('id', 'course_title_input'+i);
                postInput.setAttribute('test-id', 'course-title');
                postInput.value = unsortedStorageCourses[coursesKeys[i]][0];
                startLabel.setAttribute('for', 'course_start_date_input'+i);
                startLabel.textContent = 'Введите дату начала прохождения:';
                startInput.setAttribute('type', 'text');
                startInput.setAttribute('id', 'course_start_date_input'+i);
                startInput.setAttribute('test-id', 'course-date-start');
                startInput.value = unsortedStorageCourses[coursesKeys[i]][1];
                endLabel.setAttribute('for', 'course_end_date_input'+i);
                endLabel.textContent = 'Введите дату окончания прохождения:';
                endInput.setAttribute('type', 'text');
                endInput.setAttribute('id', 'course_end_date_input'+i);
                endInput.setAttribute('test-id', 'course-date-end');
                endInput.value = unsortedStorageCourses[coursesKeys[i]][2];
                workLabel.setAttribute('for', 'course_organization_input'+i);
                workLabel.textContent = 'Введите название организации курса:';
                workInput.setAttribute('type', 'text');
                workInput.setAttribute('id', 'course_organization_input'+i);
                workInput.setAttribute('test-id', 'course-place');
                workInput.value = unsortedStorageCourses[coursesKeys[i]][3];
                courseWrapper.appendChild(postLabel);
                courseWrapper.appendChild(postInput);
                courseWrapper.appendChild(startLabel);
                courseWrapper.appendChild(startInput);
                courseWrapper.appendChild(endLabel);
                courseWrapper.appendChild(endInput);
                courseWrapper.appendChild(workLabel);
                courseWrapper.appendChild(workInput);
    
                let newInputPost = document.getElementById(`course_title_input${i}`);
                let newInputStart = document.getElementById(`course_start_date_input${i}`);
                let newInputEnd = document.getElementById(`course_end_date_input${i}`);
                let newInputWork = document.getElementById(`course_organization_input${i}`);
                newInputPost.addEventListener('input', () => {
                    courses[`course${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
                });
                newInputStart.addEventListener('input', () => {
                    courses[`course${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
                });
                newInputEnd.addEventListener('input', () => {
                    courses[`course${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
                });
                newInputWork.addEventListener('input', () => {
                    courses[`course${i}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
                });
            }
        }
    }
}

// request to generate resume by form data
generateBtn.addEventListener('click', () => {
    generateBtn.style.visibility = 'hidden';
    resumeContainer.classList.remove("invis");
    editResumeContainer.classList.add("invis");

    var storageResumeTitle = resumeTitle || fullName;
    const fullNameText = document.getElementById('full_name_text');
    const fullNameTextRight = document.querySelector('.main__title');
    var storageFullName = fullName;
    fullNameText.textContent = storageFullName;
    fullNameTextRight.textContent = storageFullName;

    var storageBirthday = birthday;
    const birthdayWrapper = document.getElementById('birth');
    if (!storageBirthday) {
        birthdayWrapper.classList.add('invis');
    } else {
        const birthdayText = document.getElementById('birthday_text');
        birthdayWrapper.classList.remove('invis');
        var bday = storageBirthday.split('-');
        birthdayText.textContent = bday[2]+'.'+bday[1]+'.'+bday[0];
    }

    var storageCity = city;
    const cityWraper = document.getElementById('city');
    if (!storageCity){
        cityWraper.classList.add('invis');
    } else {
        const cityText = document.getElementById('city_text');
        cityWraper.classList.remove('invis');
        cityText.textContent = storageCity;
    }

    var storagePhone =phone;
    const phoneWraper = document.getElementById('phone');
    if (!storagePhone){
        phoneWraper.classList.add('invis');
    } else {
        const phoneText = document.getElementById('phone_text');
        phoneWraper.classList.remove('invis');
        phoneText.textContent = storagePhone;
    }

    var storageEmail = email;
    const emailWraper = document.getElementById('email');
    if (!storageEmail){
        emailWraper.classList.add('invis');
    } else {
        const emailText = document.getElementById('email_text');
        emailWraper.classList.remove('invis');
        emailText.textContent = storageEmail;
    }
    
    var storageInterests = interests;
    const interestsULWrapper = document.querySelector('.nav__data#interests');
    var isIntersts = false;
    for (let key in storageInterests){
        if (storageInterests[key] != '') {
            isIntersts = true;
            break;
        }
    }
    if (!isIntersts){
        interestsULWrapper.classList.add('invis');
        if (interestsULWrapper.attributes.getNamedItem('test-id')){
            interestsULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        interestsULWrapper.lastChild.remove();
        interestsULWrapper.classList.remove('invis');
        interestsULWrapper.setAttribute('test-id', 'resume-main-section');
        const interestsUL = document.createElement('ul');
        interestsUL.classList.add('nav__data-list');
        interestsUL.classList.add('interests');
        interestsULWrapper.appendChild(interestsUL);
        for (let key in storageInterests){
            let newInterest = document.createElement('h3');
            newInterest.classList.add('nav__data-item');
            newInterest.classList.add('interests');
            newInterest.textContent = storageInterests[key];
            interestsUL.appendChild(newInterest);
        }
    }

    var storageLanguages = languages;
    const languagesULWrapper = document.querySelector('.nav__data#languages');
    var isLanguages = false;
    for (let key in storageLanguages){
        if (storageLanguages[key][0] != '' && storageLanguages[key][1] != '') {
            isLanguages = true;
            break;
        }
    }
    if (!isLanguages){
        languagesULWrapper.classList.add('invis');
        if (languagesULWrapper.attributes.getNamedItem('test-id')){
            languagesULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        languagesULWrapper.lastChild.remove();
        languagesULWrapper.classList.remove('invis');
        languagesULWrapper.setAttribute('test-id', 'resume-main-section');
        const languagesUL = document.createElement('ul');
        languagesUL.classList.add('nav__data-list');
        languagesUL.classList.add('languages');
        languagesULWrapper.appendChild(languagesUL);
        for (let langList in storageLanguages){
            if (!storageLanguages[langList][0] || !storageLanguages[langList][1]){
                continue;
            }
            let newLanguageDiv = document.createElement('div');
            newLanguageDiv.classList.add('nav__data-item');
            newLanguageDiv.classList.add('languages');
            let newLanguageLang = document.createElement('h3');
            newLanguageLang.classList.add('nav__data-itemtext');
            newLanguageLang.textContent = storageLanguages[langList][0];
            let newLanguageLevel = document.createElement('p');
            newLanguageLevel.classList.add('nav__data-itemdata');
            newLanguageLevel.textContent = storageLanguages[langList][1];
            newLanguageDiv.appendChild(newLanguageLang);
            newLanguageDiv.appendChild(newLanguageLevel);
            languagesUL.appendChild(newLanguageDiv);
        }
    }

    var storageSelfDescription = selfDescription;
    const selfDescriptionWrapper = document.querySelector('.main__data#description');

    if (!storageSelfDescription){
        selfDescriptionWrapper.classList.add('invis');
    } else {
        const selfDescriptionText = document.querySelector('.main__data-description');
        selfDescriptionWrapper.classList.remove('invis');
        selfDescriptionText.textContent = storageSelfDescription;
    }

    var storageExperiences = experiences;
    const experienceULWrapper = document.getElementById('work');
    var isExperience = false;
    for (let key in storageExperiences){
        if (storageExperiences[key][0] != '') {
            isExperience = true;
            break;
        }
    }
    if (!isExperience){
        experienceULWrapper.classList.add('invis');
        if (experienceULWrapper.attributes.getNamedItem('test-id')){
            experienceULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        var unsortedStorageExperiences = storageExperiences;
        var sortedExperiences = Object.entries(storageExperiences).sort(([, a], [, b]) => {
            const dateA = a[1] ? new Date(a[1]) : new Date('9999-12-31');
            const dateB = b[1] ? new Date(b[1]) : new Date('9999-12-31');
            if (a[2] === '' && b[2] !== '') {
                return -1;
            } else if (a[2] !== '' && b[2] === '') {
                return 1;
            } else {
                return dateB - dateA;
            }
        });
        storageExperiences = Object.fromEntries(sortedExperiences);
        experienceULWrapper.lastChild.remove();
        experienceULWrapper.classList.remove('invis');
        experienceULWrapper.setAttribute('test-id', 'resume-main-section');
        const experienceUL = document.createElement('ul');
        experienceUL.classList.add('main__data-list');
        experienceULWrapper.appendChild(experienceUL);
        for (let experienceList in storageExperiences){
            if (!storageExperiences[experienceList][0]){
                continue;
            }
            let newExperienceDiv = document.createElement('div');
            newExperienceDiv.classList.add('main__data-item');

            let newContainerDiv = document.createElement('div');
            newContainerDiv.classList.add('main__data-item-container');
            
            let newContainerWraper = document.createElement('div');
            newContainerWraper.classList.add('main__data-item-titlewrapper');
            let newContainerTitle = document.createElement('h3');
            newContainerTitle.classList.add('main__data-item-title');
            newContainerTitle.textContent = storageExperiences[experienceList][0];
            let newContainerCompany = document.createElement('h4');
            newContainerCompany.classList.add('main__data-item-description');
            newContainerCompany.textContent = storageExperiences[experienceList][3];
            newContainerWraper.appendChild(newContainerTitle);
            newContainerWraper.appendChild(newContainerCompany);

            let newContainerDate = document.createElement('p');
            newContainerDate.classList.add('main__data-item-date');
            newContainerDate.style.visibility = storageExperiences[experienceList][1] != '' ? 'visible' : 'hidden';
            newContainerDate.textContent = getValidDate(storageExperiences[experienceList][1], storageExperiences[experienceList][2]);

            newContainerDiv.appendChild(newContainerWraper);
            newContainerDiv.appendChild(newContainerDate);

            let newItemText = document.createElement('p');
            newItemText.classList.add('main__data-item-text');
            newItemText.textContent = storageExperiences[experienceList][4];

            newExperienceDiv.appendChild(newContainerDiv);
            newExperienceDiv.appendChild(newItemText);

            experienceUL.appendChild(newExperienceDiv);
        }
    }

    var storageEducation = educations;
    const educationULWrapper = document.getElementById('education');
    var isEducation = false;
    for (let key in storageEducation){
        if (storageEducation[key][0] != '') {
            isEducation = true;
            break;
        }
    }
    if (!isEducation){
        educationULWrapper.classList.add('invis');
        if (educationULWrapper.attributes.getNamedItem('test-id')){
            educationULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        var unsortedStorageEducation = storageEducation;
        var sortedEducations = Object.entries(storageEducation).sort(([, a], [, b]) => {
            const dateA = a[1] ? new Date(a[1]) : new Date('9999-12-31');
            const dateB = b[1] ? new Date(b[1]) : new Date('9999-12-31');
            if (a[2] === '' && b[2] !== '') {
                return -1;
            } else if (a[2] !== '' && b[2] === '') {
                return 1;
            } else {
                return dateB - dateA;
            }
        });
        storageEducation = Object.fromEntries(sortedEducations);
        educationULWrapper.lastChild.remove();
        educationULWrapper.classList.remove('invis');
        educationULWrapper.setAttribute('test-id', 'resume-main-section');
        const educationUL = document.createElement('ul');
        educationUL.classList.add('main__data-list');
        educationULWrapper.appendChild(educationUL);
        for (let educationList in storageEducation){
            if (!storageEducation[educationList][0]){
                continue;
            }
            let newExperienceDiv = document.createElement('div');
            newExperienceDiv.classList.add('main__data-item');

            let newContainerDiv = document.createElement('div');
            newContainerDiv.classList.add('main__data-item-container');
            
            let newContainerWraper = document.createElement('div');
            newContainerWraper.classList.add('main__data-item-titlewrapper');
            let newContainerTitle = document.createElement('h3');
            newContainerTitle.classList.add('main__data-item-title');
            newContainerTitle.textContent = storageEducation[educationList][0];
            let newContainerCompany = document.createElement('h4');
            newContainerCompany.classList.add('main__data-item-description');
            newContainerCompany.textContent = storageEducation[educationList][3];
            newContainerWraper.appendChild(newContainerTitle);
            newContainerWraper.appendChild(newContainerCompany);

            let newContainerDate = document.createElement('p');
            newContainerDate.classList.add('main__data-item-date');
            newContainerDate.style.visibility = storageEducation[educationList][1] != '' ? 'visible' : 'hidden';
            newContainerDate.textContent = getValidDate(storageEducation[educationList][1], storageEducation[educationList][2]);

            newContainerDiv.appendChild(newContainerWraper);
            newContainerDiv.appendChild(newContainerDate);

            let newItemText = document.createElement('p');
            newItemText.classList.add('main__data-item-text');
            newItemText.textContent = storageEducation[educationList][4];

            newExperienceDiv.appendChild(newContainerDiv);
            newExperienceDiv.appendChild(newItemText);

            educationUL.appendChild(newExperienceDiv);
        }
    }

    var storageCourses = courses;
    const coursesULWrapper = document.getElementById('courses');
    var isCourses = false;
    for (let key in storageCourses){
        if (storageCourses[key][0] != '') {
            isCourses = true;
            break;
        }
    }
    if (!isCourses){
        coursesULWrapper.classList.add('invis');
        if (coursesULWrapper.attributes.getNamedItem('test-id')){
            coursesULWrapper.attributes.removeNamedItem('test-id');
        }
    } else {
        var unsortedStorageCourses = storageCourses
        var sortedCourses = Object.entries(storageCourses).sort(([, a], [, b]) => {
            const dateA = a[1] ? new Date(a[1]) : new Date('9999-12-31');
            const dateB = b[1] ? new Date(b[1]) : new Date('9999-12-31');
            if (a[2] === '' && b[2] !== '') {
                return -1;
            } else if (a[2] !== '' && b[2] === '') {
                return 1;
            } else {
                return dateB - dateA;
            }
        });
        storageCourses = Object.fromEntries(sortedCourses);
        coursesULWrapper.lastChild.remove();
        coursesULWrapper.classList.remove('invis');
        coursesULWrapper.setAttribute('test-id', 'resume-main-section');
        const coursesUL = document.createElement('ul');
        coursesUL.classList.add('main__data-list');
        coursesULWrapper.appendChild(coursesUL);
        for (let courseList in storageCourses){
            if (!storageCourses[courseList][0]){
                continue;
            }
            let newExperienceDiv = document.createElement('div');
            newExperienceDiv.classList.add('main__data-item');

            let newContainerDiv = document.createElement('div');
            newContainerDiv.classList.add('main__data-item-container');
            
            let newContainerWraper = document.createElement('div');
            newContainerWraper.classList.add('main__data-item-titlewrapper');
            let newContainerTitle = document.createElement('h3');
            newContainerTitle.classList.add('main__data-item-title');
            newContainerTitle.textContent = storageCourses[courseList][0];
            let newContainerCompany = document.createElement('h4');
            newContainerCompany.classList.add('main__data-item-description');
            newContainerCompany.textContent = storageCourses[courseList][3];
            newContainerWraper.appendChild(newContainerTitle);
            newContainerWraper.appendChild(newContainerCompany);

            let newContainerDate = document.createElement('p');
            newContainerDate.classList.add('main__data-item-date');
            newContainerDate.style.visibility = storageCourses[courseList][1] != '' ? 'visible' : 'hidden';
            newContainerDate.textContent = getValidDate(storageCourses[courseList][1], storageCourses[courseList][2]);

            newContainerDiv.appendChild(newContainerWraper);
            newContainerDiv.appendChild(newContainerDate);

            newExperienceDiv.appendChild(newContainerDiv);

            coursesUL.appendChild(newExperienceDiv);
        }
    }
});

// save current resume
const saveBtn = document.getElementById('save_btn');
saveBtn.addEventListener('click', () => {
    var newResume = {
        'fullName': fullName,
        'birthday': birthday,
        'city': city,
        'phone': phone,
        'email': email,
        'interests': interests,
        'languages': languages,
        'selfDescription': selfDescription,
        'experiences': experiences,
        'educations': educations,
        'courses': courses,
        'priority': Date.now()
    }
    var prevResume = localStorage.getItem('reqOpenResume');
    var copyResume = localStorage.getItem('reqCopyResume');
    if (prevResume){
        let prevSavedResume = localStorage.getItem(prevResume);
        localStorage.removeItem(prevResume);
        if (newResume.fullName == ''){
            localStorage.setItem(resumeTitle || storageResumeTitle || JSON.parse(prevSavedResume).fullName, prevSavedResume);
        } else {
            localStorage.setItem(resumeTitle || newResume.fullName, JSON.stringify(newResume));
        }
        localStorage.removeItem('reqOpenResume');
    } else {
        resumeTitle = (resumeTitle != '' ? resumeTitle : fullName);
        if (resumeTitle){
            localStorage.setItem(resumeTitle, JSON.stringify(newResume));
        }
    }
    if (reqCopyResume) localStorage.removeItem('reqCopyResume');
    window.location.href = '/all';
})

// edit current resume
backBtn.addEventListener('click', () => {
    generateBtn.style.visibility = 'visible';
    editResumeContainer.classList.remove("invis");
    resumeContainer.classList.add("invis");
    
    var resumeTitleVal = document.getElementById('resume_title_input');
    resumeTitleVal.value = storageResumeTitle || resumeTitle || fullName;
    if (resumeTitleVal.value == storageResumeTitle){
        resumeTitle = storageResumeTitle;
    }

    var flNameVal = document.getElementById('flname_input');
    flNameVal.value = storageFullName || fullName;
    if (flNameVal.value == storageFullName){
        fullName = storageFullName;
    } 
    if (document.getElementById('flname_input').value != ''){
        try { generateBtn.attributes.removeNamedItem('disabled') } 
        catch { console.log("вай, братишка") }
        generateBtn.setAttribute('enabled', 'true');
    }

    var birthdayVal = document.getElementById('birth_input');
    birthdayVal.value = storageBirthday || birthday;
    if (birthdayVal.value == storageBirthday){
        birthday = storageBirthday;
    }

    var cityVal = document.getElementById('city_input');
    cityVal.value = storageCity || city;
    if (cityVal.value == storageCity){
        city = storageCity;
    }
    
    var phoneVal = document.getElementById('phone_input');
    phoneVal.value = storagePhone || phone;
    if (phoneVal.value == storagePhone){
        phone = storagePhone;
    }

    var emailVal = document.getElementById('email_input');
    emailVal.value = storageEmail || email;
    if (emailVal.value == storageEmail){
        email = storageEmail;
    }

    var interestsKeys = storageInterests ? Object.keys(storageInterests) : [];
    if (interestsKeys.length != 0){
        interests = storageInterests;
        var interInput = document.getElementById('interest_input');
        interInput.value = storageInterests[interestsKeys[0]];
        
        let interestsWrapper = document.querySelector('.interest-wrapper');
        for (let i = 1; i < interestsKeys.length; i++){
            let newInterLabel = document.createElement('label');
            newInterLabel.textContent = 'Введите текст нового интереса:'
            newInterLabel.setAttribute('for', 'interest_input'+i)
            let newInterInput = document.createElement('input');
            newInterInput.value = storageInterests[interestsKeys[i]];
            newInterInput.setAttribute('type', 'text');
            newInterInput.setAttribute('id', 'interest_input'+i);
            newInterInput.setAttribute('test-id', 'interest');
            interestsWrapper.appendChild(newInterLabel);
            interestsWrapper.appendChild(newInterInput);

            const newInter = document.getElementById('interest_input'+i);
            newInter.addEventListener('input', () => {
                interests['interest_input'+i] = newInter.value;
            })
        }
    }

    var languageKeys = storageLanguages ? Object.keys(storageLanguages) : [];
    if (languageKeys.length != 0){
        languages = storageLanguages;
        var langInput = document.getElementById('language_input');
        langInput.value = storageLanguages[languageKeys[0]][0];
        var langLvl = document.getElementById('language_level_input');
        langLvl.value = storageLanguages[languageKeys[0]][1];
        
        let languageWrapper = document.querySelector('.language-wrapper');
        for (let i = 1; i < languageKeys.length; i++){
            let newLabelName = document.createElement('label');
            let newInputName = document.createElement('input');
            let newLabelLevel = document.createElement('label');
            let newInputLevel = document.createElement('input');
            newLabelName.setAttribute('for', 'language_input'+i);
            newLabelName.textContent = 'Введите новый язык:';
            newInputName.setAttribute('type', 'text');
            newInputName.setAttribute('id', 'language_input'+i);
            newInputName.setAttribute('test-id', 'language-name');
            newInputName.value = storageLanguages[languageKeys[i]][0];
            newLabelLevel.setAttribute('for', 'language_level_input'+i);
            newLabelLevel.textContent = 'Введите уровень владения новым языком:';
            newInputLevel.setAttribute('type', 'text');
            newInputLevel.setAttribute('id', 'language_level_input'+i);
            newInputLevel.setAttribute('test-id', 'language-level');
            newInputLevel.value = storageLanguages[languageKeys[i]][1];
            languageWrapper.appendChild(newLabelName);
            languageWrapper.appendChild(newInputName);
            languageWrapper.appendChild(newLabelLevel);
            languageWrapper.appendChild(newInputLevel);

            let newInputLang = document.getElementById(`language_input${i}`);
            let newInputLvl = document.getElementById(`language_level_input${i}`);
            newInputLang.addEventListener('input', () => {
                languages[`language_input${i+1}`] = [newInputLang.value, newInputLvl.value];
            });
            newInputLvl.addEventListener('input', () => {
                languages[`language_input${i+1}`] = [newInputLang.value, newInputLvl.value];
            });
        }
    }

    var selfDescVal = document.getElementById('self_description_input');
    selfDescVal.value = storageSelfDescription || selfDescription;
    if (selfDescVal.value == storageSelfDescription){
        selfDescription = storageSelfDescription;
    }

    var experienceKeys = unsortedStorageExperiences ? Object.keys(unsortedStorageExperiences) : [];
    if (experienceKeys.length != 0){
        experiences = unsortedStorageExperiences;
        var postinput = document.getElementById('post_input');
        postinput.value = unsortedStorageExperiences[experienceKeys[0]][0];
        var startinput = document.getElementById('work_start_date_input');
        startinput.value = unsortedStorageExperiences[experienceKeys[0]][1];
        var endinput = document.getElementById('work_end_date_input');
        endinput.value = unsortedStorageExperiences[experienceKeys[0]][2];
        var placeinput = document.getElementById('work_place_input');
        placeinput.value = unsortedStorageExperiences[experienceKeys[0]][3];
        var infoinput = document.getElementById('work_information_input');
        infoinput.value = unsortedStorageExperiences[experienceKeys[0]][4];
        
        let experienceWrapper = document.querySelector('.experience-wrapper');
        for (let i = 1; i < experienceKeys.length; i++){
            let postLabel = document.createElement('label');
            let postInput = document.createElement('input');
            let startLabel = document.createElement('label');
            let startInput = document.createElement('input');
            let endLabel = document.createElement('label');
            let endInput = document.createElement('input');
            let workLabel = document.createElement('label');
            let workInput = document.createElement('input');
            let infoLabel = document.createElement('label');
            let infoInput = document.createElement('input');
            postLabel.setAttribute('for', 'post_input'+i);
            postLabel.textContent = 'Введите должность:';
            postInput.setAttribute('type', 'text');
            postInput.setAttribute('id', 'post_input'+i);
            postInput.setAttribute('test-id', 'job-title');
            postInput.value = unsortedStorageExperiences[experienceKeys[i]][0];
            startLabel.setAttribute('for', 'work_start_date_input'+i);
            startLabel.textContent = 'Введите дату начала работы:';
            startInput.setAttribute('type', 'text');
            startInput.setAttribute('id', 'work_start_date_input'+i);
            startInput.setAttribute('test-id', 'job-date-start');
            startInput.value = unsortedStorageExperiences[experienceKeys[i]][1];
            endLabel.setAttribute('for', 'work_end_date_input'+i);
            endLabel.textContent = 'Введите дату окончания работы:';
            endInput.setAttribute('type', 'text');
            endInput.setAttribute('id', 'work_end_date_input'+i);
            endInput.setAttribute('test-id', 'job-date-end');
            endInput.value = unsortedStorageExperiences[experienceKeys[i]][2];
            workLabel.setAttribute('for', 'work_place_input'+i);
            workLabel.textContent = 'Введите название места работы:';
            workInput.setAttribute('type', 'text');
            workInput.setAttribute('id', 'work_place_input'+i);
            workInput.setAttribute('test-id', 'job-place');
            workInput.value = unsortedStorageExperiences[experienceKeys[i]][3];
            infoLabel.setAttribute('for', 'work_information_input'+i);
            infoLabel.textContent = 'Введите чем вы занимались на работе:';
            infoInput.setAttribute('type', 'text');
            infoInput.setAttribute('id', 'work_information_input'+i);
            infoInput.setAttribute('test-id', 'job-description');
            infoInput.value = unsortedStorageExperiences[experienceKeys[i]][4];
            experienceWrapper.appendChild(postLabel);
            experienceWrapper.appendChild(postInput);
            experienceWrapper.appendChild(startLabel);
            experienceWrapper.appendChild(startInput);
            experienceWrapper.appendChild(endLabel);
            experienceWrapper.appendChild(endInput);
            experienceWrapper.appendChild(workLabel);
            experienceWrapper.appendChild(workInput);
            experienceWrapper.appendChild(infoLabel);
            experienceWrapper.appendChild(infoInput);

            let newInputPost = document.getElementById(`post_input${i}`);
            let newInputStart = document.getElementById(`work_start_date_input${i}`);
            let newInputEnd = document.getElementById(`work_end_date_input${i}`);
            let newInputWork = document.getElementById(`work_place_input${i}`);
            let newInputInfo = document.getElementById(`work_information_input${i}`);
            newInputPost.addEventListener('input', () => {
                experiences[`experience${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
            newInputStart.addEventListener('input', () => {
                experiences[`experience${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
            newInputEnd.addEventListener('input', () => {
                experiences[`experience${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
            newInputWork.addEventListener('input', () => {
                experiences[`experience${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
            newInputInfo.addEventListener('input', () => {
                experiences[`experience${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
        }
    }

    var educationKeys = unsortedStorageEducation ? Object.keys(unsortedStorageEducation) : [];
    if (educationKeys.length != 0){
        educations = unsortedStorageEducation;
        var postinput = document.getElementById('education_input');
        postinput.value = unsortedStorageEducation[educationKeys[0]][0];
        var startinput = document.getElementById('education_start_date_input');
        startinput.value = unsortedStorageEducation[educationKeys[0]][1];
        var endinput = document.getElementById('education_end_date_input');
        endinput.value = unsortedStorageEducation[educationKeys[0]][2];
        var placeinput = document.getElementById('education_place_input');
        placeinput.value = unsortedStorageEducation[educationKeys[0]][3];
        var infoinput = document.getElementById('education_addedinformation_input');
        infoinput.value = unsortedStorageEducation[educationKeys[0]][4];
        
        let educationWrapper = document.querySelector('.education-wrapper');
        for (let i = 1; i < educationKeys.length; i++){
            let postLabel = document.createElement('label');
            let postInput = document.createElement('input');
            let startLabel = document.createElement('label');
            let startInput = document.createElement('input');
            let endLabel = document.createElement('label');
            let endInput = document.createElement('input');
            let workLabel = document.createElement('label');
            let workInput = document.createElement('input');
            let infoLabel = document.createElement('label');
            let infoInput = document.createElement('input');
            postLabel.setAttribute('for', 'education_input'+i);
            postLabel.textContent = 'Введите высшее образование:';
            postInput.setAttribute('type', 'text');
            postInput.setAttribute('id', 'education_input'+i);
            postInput.setAttribute('test-id', 'education-title');
            postInput.value = unsortedStorageEducation[educationKeys[i]][0];
            startLabel.setAttribute('for', 'education_start_date_input'+i);
            startLabel.textContent = 'Введите дату начала обучения:';
            startInput.setAttribute('type', 'text');
            startInput.setAttribute('id', 'education_start_date_input'+i);
            startInput.setAttribute('test-id', 'education-date-start');
            startInput.value = unsortedStorageEducation[educationKeys[i]][1];
            endLabel.setAttribute('for', 'education_end_date_input'+i);
            endLabel.textContent = 'Введите дату окончания обучения:';
            endInput.setAttribute('type', 'text');
            endInput.setAttribute('id', 'education_end_date_input'+i);
            endInput.setAttribute('test-id', 'education-date-end');
            endInput.value = unsortedStorageEducation[educationKeys[i]][2];
            workLabel.setAttribute('for', 'education_place_input'+i);
            workLabel.textContent = 'Введите название места обучения:';
            workInput.setAttribute('type', 'text');
            workInput.setAttribute('id', 'education_place_input'+i);
            workInput.setAttribute('test-id', 'education-place');
            workInput.value = unsortedStorageEducation[educationKeys[i]][3];
            infoLabel.setAttribute('for', 'education_addedinformation_input'+i);
            infoLabel.textContent = 'Введите дополнительную информацию об учебе:';
            infoInput.setAttribute('type', 'text');
            infoInput.setAttribute('id', 'education_addedinformation_input'+i);
            infoInput.setAttribute('test-id', 'education-description');
            infoInput.value = unsortedStorageEducation[educationKeys[i]][4];
            educationWrapper.appendChild(postLabel);
            educationWrapper.appendChild(postInput);
            educationWrapper.appendChild(startLabel);
            educationWrapper.appendChild(startInput);
            educationWrapper.appendChild(endLabel);
            educationWrapper.appendChild(endInput);
            educationWrapper.appendChild(workLabel);
            educationWrapper.appendChild(workInput);
            educationWrapper.appendChild(infoLabel);
            educationWrapper.appendChild(infoInput);

            let newInputPost = document.getElementById(`education_input${i}`);
            let newInputStart = document.getElementById(`education_start_date_input${i}`);
            let newInputEnd = document.getElementById(`education_end_date_input${i}`);
            let newInputWork = document.getElementById(`education_place_input${i}`);
            let newInputInfo = document.getElementById(`education_addedinformation_input${i}`);
            newInputPost.addEventListener('input', () => {
                educations[`education${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
            newInputStart.addEventListener('input', () => {
                educations[`education${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
            newInputEnd.addEventListener('input', () => {
                educations[`education${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
            newInputWork.addEventListener('input', () => {
                educations[`education${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
            newInputInfo.addEventListener('input', () => {
                educations[`education${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value, newInputInfo.value];
            });
        }
    }

    var coursesKeys = unsortedStorageCourses ? Object.keys(unsortedStorageCourses) : [];
    if (coursesKeys.length != 0){
        courses = unsortedStorageCourses;
        var postinput = document.getElementById('course_title_input');
        postinput.value = unsortedStorageCourses[coursesKeys[0]][0];
        var startinput = document.getElementById('course_start_date_input');
        startinput.value = unsortedStorageCourses[coursesKeys[0]][1];
        var endinput = document.getElementById('course_end_date_input');
        endinput.value = unsortedStorageCourses[coursesKeys[0]][2];
        var placeinput = document.getElementById('course_organization_input');
        placeinput.value = unsortedStorageCourses[coursesKeys[0]][3];
        
        let courseWrapper = document.querySelector('.course-wrapper');
        for (let i = 1; i < coursesKeys.length; i++){
            let postLabel = document.createElement('label');
            let postInput = document.createElement('input');
            let startLabel = document.createElement('label');
            let startInput = document.createElement('input');
            let endLabel = document.createElement('label');
            let endInput = document.createElement('input');
            let workLabel = document.createElement('label');
            let workInput = document.createElement('input');
            postLabel.setAttribute('for', 'course_title_input'+i);
            postLabel.textContent = 'Введите название курса:';
            postInput.setAttribute('type', 'text');
            postInput.setAttribute('id', 'course_title_input'+i);
            postInput.setAttribute('test-id', 'course-title');
            postInput.value = unsortedStorageCourses[coursesKeys[i]][0];
            startLabel.setAttribute('for', 'course_start_date_input'+i);
            startLabel.textContent = 'Введите дату начала прохождения:';
            startInput.setAttribute('type', 'text');
            startInput.setAttribute('id', 'course_start_date_input'+i);
            startInput.setAttribute('test-id', 'course-date-start');
            startInput.value = unsortedStorageCourses[coursesKeys[i]][1];
            endLabel.setAttribute('for', 'course_end_date_input'+i);
            endLabel.textContent = 'Введите дату окончания прохождения:';
            endInput.setAttribute('type', 'text');
            endInput.setAttribute('id', 'course_end_date_input'+i);
            endInput.setAttribute('test-id', 'course-date-end');
            endInput.value = unsortedStorageCourses[coursesKeys[i]][2];
            workLabel.setAttribute('for', 'course_organization_input'+i);
            workLabel.textContent = 'Введите название организации курса:';
            workInput.setAttribute('type', 'text');
            workInput.setAttribute('id', 'course_organization_input'+i);
            workInput.setAttribute('test-id', 'course-place');
            workInput.value = unsortedStorageCourses[coursesKeys[i]][3];
            courseWrapper.appendChild(postLabel);
            courseWrapper.appendChild(postInput);
            courseWrapper.appendChild(startLabel);
            courseWrapper.appendChild(startInput);
            courseWrapper.appendChild(endLabel);
            courseWrapper.appendChild(endInput);
            courseWrapper.appendChild(workLabel);
            courseWrapper.appendChild(workInput);

            let newInputPost = document.getElementById(`course_title_input${i}`);
            let newInputStart = document.getElementById(`course_start_date_input${i}`);
            let newInputEnd = document.getElementById(`course_end_date_input${i}`);
            let newInputWork = document.getElementById(`course_organization_input${i}`);
            newInputPost.addEventListener('input', () => {
                courses[`course${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
            });
            newInputStart.addEventListener('input', () => {
                courses[`course${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
            });
            newInputEnd.addEventListener('input', () => {
                courses[`course${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
            });
            newInputWork.addEventListener('input', () => {
                courses[`course${i+1}`] = [newInputPost.value, newInputStart.value, newInputEnd.value, newInputWork.value];
            });
        }
    }
});