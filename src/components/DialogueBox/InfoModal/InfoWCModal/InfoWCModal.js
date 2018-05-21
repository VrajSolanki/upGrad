import React, { PropTypes } from 'react'
import classes from './InfoWCModal.scss'
const tableRows =
[
  ['','Exemplary','Strong','Proficient','Developing', 'Emerging', 'Beginning'],
  [
    ['Ideas & Content','main theme','supporting details'],
    ['Exceptionally clear, focused, engaging with relevant, strong supporting detail'],
    ['Clear, focused, interesting ideas with appropriate detail'],
    ['Evident main idea with some support which may be general or limited'],
    ['Main idea may be cloudy because supporting detail is too general or even off-topic'],
    ['Purpose and main idea may be unclear and cluttered by irrelevant detail'],
    ['Lacks central idea; development is minimal or non-existent']
  ],
  [
    ['Organization','structure','introduction','conclusion'],
    ['Effectively organized in logical and creative manner','Creative and engaging intro and conclusion'],
    ['Strong order and structure','Inviting intro and satisfying closure'],
    ['Organization is appropriate, but conventional','Attempt at introduction and conclusion'],
    ['Attempts at organization; may be a “list” of events','Beginning and endingnot developed'],
    ['Lack of structure; disorganized and hard to follow','Missing or weak intro and conclusion'],
    ['Lack of coherence; confusing','No identifiable introduction or conclusion']
  ],
  [
    ['Voice','personality','sense of audience'],
    ['Expressive, engaging, sincere','Strong sense of audience','Shows emotion: humour, honesty, suspense or life'],
    ['Appropriate to audience and purpose','Writer behind the words comes through'],
    ['Evident commitment to topic','Inconsistent or dull personality'],
    ['Voice may be inappropriate or non-existent','Writing may seem mechanical'],
    ['Writing tends to be flat or stiff','Little or no hint of writer behind words'],
    ['Writing is lifeless','No hint of the writer']
  ],
  [
    ['Word Choice','precision','effectiveness','imagery'],
    ['Precise, carefully chosen','Strong, fresh, vivid images'],
    ['Descriptive, broad range of words','Word choice energizes writing'],
    ['Language is functional and appropriate','Descriptions may be overdone at times'],
    ['Words may be correct but mundane','No attempt at deliberate choice'],
    ['Monotonous, often repetitious, sometimes inappropriate'],
    ['Limited range of words','Some vocabulary misused']
  ],
  [
    ['Sentence Fluency','rhythm, flow','variety'],
    ['High degree of craftsmanship','Effective variation in sentence patterns'],
    ['Easy flow and rhythm','Good variety in length and structure'],
    ['Generally in control','Lack variety in length and structure'],
    ['Some awkward constructions','Many similar patterns and beginnings'],
    ['Often choppy','Monotonous sentence patterns','Frequent run-on sentence'],
    ['Difficult to follow or read aloud','Disjointed, confusing, rambling']
  ],
  [
    ['Conventions','age appropriate, spelling, caps, punctuation, grammar'],
    ['Exceptionally strong control of standard conventions of writing'],
    ['Strong control of conventions; errors are few and minor'],
    ['Control of most writing conventions; occasional errors with high risks'],
    ['Limited control of conventions; frequent errors do not interfere with understanding'],
    ['Frequent significant errors may impede readability'],
    ['Numerous errors distract the reader and make the text difficult to read']
  ]
];

const InfoWCModal = (props) => {

  const tableRowsDiv = tableRows.map((tableRow,key) => {
    if(key == 0){
      let headerTableRow = tableRow.map((cellText,headerKey) => {
        return (
          <div className={ classes.headerTableCell } key={headerKey}>
            <div className={classes.tableHeaderTitle}>{cellText}</div>
          </div>
        )
      })
      return (
        <div className = {classes.contentRow} key={key}>
          {headerTableRow}
        </div>
      )
    } else {
      let contentTableRow = tableRow.map((cellTextArray,contentKey) => {
        return (
          <div className={ classes.stdTableCell } key={contentKey}>
            <ul className={classes.tableTitle}>
              {
                cellTextArray.map((listText,listKey) => {
                return (

                  <li key={listKey} className={contentKey == 0 && listKey == 0 ? classes.boldListKey: null}>{listText}</li>
                )
                })
              }
            </ul>
          </div>
        )
      })
      return (
        <div className = {classes.contentRow} key={key}>
          {contentTableRow}
        </div>
      )
    }

  })

  return (
    <div className={classes.contentRows}>
      {tableRowsDiv}
    </div>
  )
}

export default InfoWCModal
