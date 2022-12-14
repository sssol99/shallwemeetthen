import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {
  quizGetScoreApi,
} from '../../api/QuizApi'
import {
  getArticleCount,
  getTotalUserArticleCountApi,
  getGroupArticleCountApi 
} from '../../api/MemoryApi'
import {
  getTotalArticleCountApi,
  getLastAuthorApi,
  getMostWrittenMemberApi,
  getLongestWrittenMemberApi,
  getQuizKingApi
} from '../../api/StatisticsApi'
import '../../pages/MemoryList/MemoryList.css'
import '../../Common.css'
import MemoryCard from './MemoryCard'
import MemoryCardVideo from './MemoryCardVideo'
import Piechart from '../Statistics/Piechart'
import Calendar from '../Statistics/Calendar'
import LineChart from '../Statistics/LineChart.js'
import { Cdata } from '../Statistics/Cdata'

export default function MemoryComponent3(props) {
  const { groupSeq } = useParams()
  const [score, setScore] = useState(0)
  const [graphBtn, setgraphBtn] = useState(true)
  const [totalArticle, setTotalArticle] = useState(0)
  const [lastArticle, setLastArticle] = useState('')
  const [manyArticle, setManyArticle] = useState('')
  const [longArticle, setLongArticle] = useState('')
  const [manyQuiz, setManyQuiz] = useState('')
  const [myArticleCount, setMyArticleCount] = useState(0)
  useEffect(() => {
    getArticleCount({groupSeq})
      .then(res => {
        // console.log(res.data);
        setMyArticleCount(res.data.articleCount)
      })
      .catch(err => {
        console.error(err);
      })
  }, [myArticleCount])
  useEffect(() => {
    quizGetScoreApi({groupSeq})
      .then(res => {
        // console.log(res.data);
        setScore(res.data.score)
      })
      .catch(err => {
        console.error(err);
      })
  }, [])
  useEffect(() => {
    getTotalArticleCountApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setTotalArticle(res.data.totalCount)
      })
      .catch(err => {
        console.error(err)
      })

    getLastAuthorApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setLastArticle(res.data.nickname)
      })
      .catch(err => {
        console.error(err)
      })

    getMostWrittenMemberApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setManyArticle(res.data.nickname)
      })
      .catch(err => {
        console.error(err)
      })

    getLongestWrittenMemberApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setLongArticle(res.data.nickname)
      })
      .catch(err => {
        console.error(err)
      })

    getQuizKingApi(groupSeq)
      .then(res => {
        // console.log(res.data);
        setManyQuiz(res.data.nickname)
      })
      .catch(err => {
        console.error(err)
      })

  }, [])

  return (
    <>
    <div className='memory-content'>
      <article className='memory-article'>
        <div>
          <div className='memory-article-content'>
            <div className='statistics-main'>
              <div className='d-flex'>
                {/* groupbox */}
                <div className='statistics-box'>
                  <div className='statistics-box-content'>
                    <h3>Group State</h3>
                    <div className='statistics-problem'>
                      <div>??? ????????? : </div>
                      <div>?????? ?????? ???????????? ????????? ?????? : </div>
                      <div>?????? ?????? ?????? ????????? ?????? : </div>
                      <div>?????? ?????? ?????? ????????? ?????? : </div>
                      <div>????????? ?????? ?????? ?????? ?????? : </div>
                    </div>
                    <div className='statistics-question'>
                      <div>{totalArticle}??? </div>
                      <div>{lastArticle}</div>
                      <div>{manyArticle}</div>
                      <div>{longArticle}</div>
                      <div>{manyQuiz}</div>
                    </div>
                    <div className='statistics-score'>
                      <div className='statistics-score-head'>My score</div>
                      <div className='statistics-score-content'>{score}</div>
                    </div>
                  </div>
                </div>
                {/* LineChart */}
                <LineChart/>
              </div>
              {/* Calendar */}
              <div className='statistics-calendar-box'>
                <div className='calendar-text'>????????? " {myArticleCount} " ?????? ?????? ?????????????????????. </div>
                <Calendar/>
              </div>
              <div className='statistics-pichar-box'>
                <div className='piechat-text'>??? ????????? ??????</div>
                <Piechart/>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    </>
  )
}