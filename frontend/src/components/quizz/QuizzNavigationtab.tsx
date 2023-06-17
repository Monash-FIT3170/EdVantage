import './Quizz.css'
import NavigationQuestionBox from './NavigationQuestionBox';
function QuizzNavigationtab (){
    var output= <div className='navigattion-tab'> 
    <div>Question List</div>
    <div className='ans-box-field'>
    <div> {NavigationQuestionBox(1,"correct")}</div>
    <div> {NavigationQuestionBox(12,"choosen")}</div>
    <div> {NavigationQuestionBox(99,"unchoosen")}</div>
    </div>
    <div>submit</div>
    </div>

return(output);
}
export default QuizzNavigationtab