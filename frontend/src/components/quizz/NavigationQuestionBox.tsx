import './Quizz.css'
function NavigationQuestionBox (questionNumber: number,status){
    var bottomBox
    if(status=="correct"){
        bottomBox= <div className='bottom-question-box-choosen-correct'>✓
        </div>
    }else  if(status=="choosen")
    {
        bottomBox= <div className='bottom-question-box-choosen'>
        </div>
    } else{
        bottomBox=<div className='bottom-question-box'>
        </div>
    }
    var output= <div className='navigation-question-box'> 
    <div className='top-question-box'>
        <div className='box-text'>{questionNumber}</div>
    </div>
    {bottomBox}
    </div>

return(output);
}
export default NavigationQuestionBox