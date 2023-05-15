import React, {useState} from 'react'
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import './Quizz.css'

function MultipleQuizz () {
    var [currentQuestion, setCurrentQuestion]=useState(0);
    var showPreviusButton=false;
    var showNextsButton=false;

    var questionList=[{
        id:0,
        text:"How manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a car How manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a car How manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a car How manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a car",
        type: "single-multiple",
        morethanoneans:false,
        options:[
            {id:0, text:"1", isChoosen:false},
            {id:1, text:"2", isChoosen:false},
            {id:2, text:"3", isChoosen:false},
            {id:3, text:"4", isChoosen:false},
        ]
    },
    {
        id:1,
        text:"Is team 2 hard-working",
        type: "single-multiple",
        morethanoneans:false,
        options:[
            {id:0, text:"very much", isChoosen:true},
            {id:1, text:"a lot", isChoosen:false},
            {id:2, text:" they alway working on the project", isChoosen:false},
            {id:3, text:"1000 out of 10", isChoosen:false},
        ]
    },
    {
        id:2,
        text:"this is question 3",
        type: "single-multiple",
        morethanoneans:false,
        options:[
            {id:0, text:"answer 3 1", isChoosen:true},
            {id:1, text:"answer 3 2", isChoosen:false},
            {id:2, text:"answer 3 3", isChoosen:false},
            {id:3, text:"answer 3 4", isChoosen:false},
        ]
    },
    ];
    var answerList=[];
    function showButton(){
        if (currentQuestion==0){
            showPreviusButton=false;
        }
        // if (cr===0){
        //     setShowPreviusButton(false);
        // } else {
        //     setShowPreviusButton(true);
        // }
        // if (currentQuestion===questionList.length){
        //     setShowPreviusButton(false);
        // } else {
        //     setShowPreviusButton(true);
        // }
    }
    showButton();
    function recordAnswer(questionid,ans){
     if(questionList[currentQuestion].type=="single-multiple"){
        var temp={
            "id":questionid,
            "answer":ans,
        };
        var ischecked=0;
        for (var i=0;i<answerList.length;i++){
            if(answerList[0].id==questionid){
              answerList[0].answer=ans;
            if(ans.isChoosen){
                ans.isChoosen=false;
                answerList.pop()
            }
            questionList[currentQuestion].options[ans.id].isChoosen=true
              ischecked=1;
              console.log(questionList[currentQuestion].options)
            }
        }
        if(ischecked==0){
            answerList.push(temp);
            console.log(questionid);
            console.log(ans.text);
      
            ans.isChoosen=true;
            console.log(questionList[currentQuestion].options)
        }
        if(currentQuestion+1<questionList.length){
            //setCurrentQuestion(currentQuestion+1);
        } else {
         
        }
     }
    }
    function printAnswer(option){
        if(!option.isChoosen){
            return (<li className='multiple-choice' key={option.id} onClick={()=>recordAnswer(questionList[currentQuestion].id,option)}>{option.text}</li>)
        }else{
            return (<li className='selected-multiple-choice' key={option.id} onClick={()=>recordAnswer(questionList[currentQuestion].id,option)}>{option.text}</li>)

        }
    }

    function goToPreviousQuestion(){
        if (currentQuestion>=1){
            setCurrentQuestion(currentQuestion-1);
        }
    }
    function goToNextQuestion(){
        if (currentQuestion+1<questionList.length){
            setCurrentQuestion(currentQuestion+1);
        }
    }
    return (
    <div className='question-card'>
    <div className='question-field'>
    <button className='previous-button-field' onClick={()=>goToPreviousQuestion()}>Previous Question</button>
    <h2 className='question-index'>Question {currentQuestion+1} out of {questionList.length}</h2>
    <button className='next-button-field' onClick={()=>goToNextQuestion()}>Next Question</button>
    </div>
    <h2 className='question-txt'>{questionList[currentQuestion].text}</h2>

      <ul className='multiple-box'>
        {questionList[currentQuestion].options.map((option) => {
            return (printAnswer(option));
        })}    
        </ul>
    </div>
    )
}

export default MultipleQuizz