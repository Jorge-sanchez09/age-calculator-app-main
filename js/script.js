const form = document.getElementById('form'),
    dayInput = form.elements['day'],
    monthInput = form.elements['month'],
    yearInput = form.elements['year'];

const spanDays = document.getElementById('days'), 
      spanMonths = document.getElementById('months'),
      spanYears = document.getElementById('years')

const inputs = [dayInput, monthInput, yearInput];

const actualDate = new Date();

form.addEventListener('submit', e => {
    e.preventDefault();

    let inputContainer;
    let validForm = true;
    
    inputs.forEach(input => {
        const inputValue = input.value.trim();
        inputContainer = input.closest('div');

        if(inputValue === ''){
            showAlert("This field is required", input);
            validForm = false;
        }
        else if(inputValue <= 0 || (input.name === 'day' && inputValue > 31) || (input.name === 'month' && inputValue > 12)){
            showAlert(`Must be a valid ${input.name}`, input);
            validForm = false;
        }
        else if (input.name === 'year' && (inputValue > actualDate.getFullYear()) ){
            showAlert('Must be in the past', input);
            validForm = false;
        }
        else
            cleanAlerts(inputContainer);
    });
    
    if(!validForm)
        return; 

    const birthDate = new Date(yearInput.value, monthInput.value - 1, dayInput.value);

    if(birthDate.getDate().toString() !== dayInput.value){
        dayInputContainer = dayInput.closest('div');

        showAlert("Must be a valid date", dayInputContainer, true);
        validForm = false;
    }

    if(!validForm)
        return; 

    calculateAge(birthDate);
});

function calculateAge(birthDate){

    const dobDate = birthDate.getDate();
    const dobMonth = birthDate.getMonth();
    const dobYear = birthDate.getFullYear();
    
    const currentYear = actualDate.getFullYear();  
    const currentMonth = actualDate.getMonth();  
    const currentDate = actualDate.getDate();  

    let yearAge = currentYear - dobYear;  
    let monthAge;
    let dateAge;

    if (currentMonth >= dobMonth)
        monthAge = currentMonth - dobMonth;  
    else {  
        yearAge--;  
        monthAge = 12 + currentMonth - dobMonth;  
    }  

    if (currentDate >= dobDate)  
        dateAge = currentDate - dobDate;  
    else {  
        monthAge--;  
        dateAge = 31 + currentDate - dobDate;  

        if (monthAge < 0) {  
            monthAge = 11;  
            yearAge--;  
        }  
    }  

    const age = {  
        years: yearAge,  
        months: monthAge,  
        days: dateAge  
    };  

    
    spanYears.textContent = age.years;
    spanMonths.textContent = age.months;
    spanDays.textContent = age.days;
}

function showAlert(message, input, allInputs = false){

    const alertParagraph = document.createElement('p');
    alertParagraph.textContent = message;

    if(!allInputs){
        const inputContainer = input.closest('div');

        cleanAlerts(inputContainer);  
    
        inputContainer.classList.add("form__group--error");
        inputContainer.appendChild(alertParagraph);
    }
    else{
        inputs.forEach(input => {
            let inputContainer = input.closest('div'); 
            inputContainer.classList.add("form__group--error");
        });

        dayInput.closest('div').appendChild(alertParagraph);
    }
}

function cleanAlerts(inputContainer){
    if(inputContainer.classList.contains("form__group--error")){
        inputContainer.classList.remove("form__group--error");

        const alertParagraph = inputContainer.querySelector("p");

        if(alertParagraph)
            alertParagraph.remove();
    }
    
}
      
