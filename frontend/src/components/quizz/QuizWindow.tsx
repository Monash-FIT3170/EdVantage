import MultipleQuizz from './MultipleQuizz'
import './Quizz.css'
import QuizzNavigationtab from './QuizzNavigationtab';
function QuizWindow (){
    var output= <div className='question-tab'> 
    {MultipleQuizz()}
    {QuizzNavigationtab()}
    </div>

return(output);
}
export default QuizWindow