const fields = document.querySelectorAll("[required]")

function ValidateField(field){
    // para verificar se tem erros

    function verifyErrors(){
        let foundError= false;

        for (let error in field.validity){
            //se nao for customerros
            //entao verificar se tem erros

            if(field.validity[error] && !field.valid){
                foundError=error
            }
        }
        return foundError;

        // verificando os customerros

        function customMessage(typeError){
            const menssages={
                Text:{
                    valueMissing: "Por Favor, Preencha este Campo"
                },
                email:{
                    valueMissing:"Email é Obrigatório!!",
                    typeMismatch: "Por Favor, Preencha um Email Válido"
                }
            }
            return menssages[field.type][typeError]
        }

        function setCustomMessage(menssage){
            const spanError= field.parentNode.querySelector(span.error)

            if(menssages){
                spanError.classList.add("active")
                spanError.innerHtml=menssage
            }
            else{
                spanError.classList.remove("active")
                spanError.innerHtml=""
            }
        }
        return function() {
            const error = verifyErrors()

            if(error){
                const menssage= customMessage(error)
                field.style.borderColor = "red"
                setCustomMessage(menssage)
            }
            else{
                field.style.borderColor= "greem"
                setCustomMessage()
            }
        }
    }
    function customValidation(event){
        const field= event.target
        const validation= ValidateField(field)

        validation()
    }

    for(field of fields){
        field.addEventListener("invalid", Event => {

            //eliminar as bolhas

            Event.preventDefault()

            customValidation(Event)
        })
        field.addEventListener("blur", customValidation)
    }

    document.querySelector("form").addEventListener("submit", Event =>{
        console.log("enviar o formulário")

        //nao vai enviar o formulário
        Event.preventDefault()
    })
}

//pagina hobby//
let totalSlides = document.querySelectorAll('.slider--item').length;
let currentSlide = 0;

let sliderWidth = document.querySelector('.slider').clientWidth;

document.querySelector('.slider--width').style.width = 
    `${sliderWidth * totalSlides}px`;

document.querySelector('.slider--controls').style.width = 
    `${sliderWidth}px`;
document.querySelector('.slider--controls').style.height = 
    `${document.querySelector('.slider').clientHeight}px`;

function goPrev() {
    currentSlide--;
    if(currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    updateMargin();
}
function goNext() {
    currentSlide++;
    if(currentSlide > (totalSlides-1)) {
        currentSlide = 0;
    }
    updateMargin();
}

function updateMargin() {
    let sliderItemWidth = document.querySelector('.slider--item').clientWidth;
    let newMargin = (currentSlide * sliderItemWidth);
    document.querySelector('.slider--width').style.marginLeft = 
        `-${newMargin}px`;
}

setInterval(goNext, 5000);