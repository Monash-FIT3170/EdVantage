import React, {useState} from 'react'
import './Quizz.css'

function MultipleQuizz () {
    var [currentQuestion, setCurrentQuestion]=useState(0);
    var questionList=[{
        id:0,
        text:"How manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a car How manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a carHow manyzzzzzzzzzzzzzzzzzzzzzzzzzzzzz wheels in a car",
        type: "multiple",
        options:[
            {id:0, text:"1"},
            {id:1, text:"2"},
            {id:2, text:"3"},
            {id:3, text:"4"},
        ]
    },
    {   
        id:1,
        text:"question2",
        type: "multiple",
        options:[
            {id:0, text:"Libin"},
            {id:1, text:"Nick"},
            {id:2, text:"Daniel"},
            {id:3, text:"Shareef"},
            {id:4, text:"Zareef"},
        ]
    },
    {   
        id:2,
        text:"question3",
        type: "multiple",
        options:[
            {id:0, text:"Libin3"},
            {id:1, text:"Nick3"},
            {id:2, text:"Daniel3"},
            {id:3, text:"Shareef3"},
            {id:4, text:"Zareef3"},
        ]
    },
    ];
    var answerList=[];
    function recordAnswer(questionid,ans){
        var temp={
            "id":questionid,
            "answer":ans,
        };
        var ischecked=0;
        for (var i=0;i<answerList.length;i++){
            if(answerList[0].id==questionid){
              answerList[0].answer=ans;
              ischecked=1;
            }
        }
        if(ischecked==0){
            answerList.push(temp);
        }
        if(currentQuestion+1<questionList.length){
            setCurrentQuestion(currentQuestion+1);
        } else {
            console.log(answerList);
        }
    }
    return (
    <div className='question-card'>
    <div className='question-field'>
    <h2 className='question-index'>Question {currentQuestion+1} out of {questionList.length}</h2>
    <h2 className='question-txt'>{questionList[currentQuestion].text}</h2>
    </div>
      <ul className='multiple-box'>
        {questionList[currentQuestion].options.map((option) => {
            return (
            <li className='multiple-choice' key={option.id} onClick={()=>recordAnswer(questionList[currentQuestion].id,option)}>{option.text}</li>
            );
        })}    
        </ul>
    </div>
    )
}

export default MultipleQuizz