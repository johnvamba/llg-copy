import React, { useState, useCallback } from 'react';

const OrgQuestions = ({answers = {}, updateAnswers = {}, errors = {}}) => {
	return <div>
		<div className={'questions'}>
			<p>Is your organisation registered with ACNC?</p>
			<div className={`question-buttons ${answers.acnc ? 'active': ''}`}>
				<span onClick={()=>updateAnswers('acnc',true)}>YES</span>
				<span onClick={()=>updateAnswers('acnc',false)}>NO</span>
			</div>
		</div>
		<div className={'questions'}>
			<p>Are you registered for fundraising?</p>
			<div className={`question-buttons ${answers.fundraiser ? 'active': ''}`}>
				<span onClick={()=>updateAnswers('fundraiser',true)}>YES</span>
				<span onClick={()=>updateAnswers('fundraiser',false)}>NO</span>
			</div>
		</div>
		<div className={'questions'}>
			<p>Do you have public liability insurance?</p>
			<div className={`question-buttons ${answers.insured ? 'active': ''}`}>
				<span onClick={()=>updateAnswers('insured',true)}>YES</span>
				<span onClick={()=>updateAnswers('insured',false)}>NO</span>
			</div>
		</div>
		<div className={'questions'}>
			<p>Are you registered as a tax deductible gift recipient?</p>
			<div className={`question-buttons ${answers.taxable ? 'active': ''}`}>
				<span onClick={()=>updateAnswers('taxable',true)}>YES</span>
				<span onClick={()=>updateAnswers('taxable',false)}>NO</span>
			</div>
		</div>
		<label className="check-container">
			Create an account means you're okay with our <a href="/agreement.pdf" download>Terms of Service</a>
			<input type="checkbox" name='terms' checked={answers.terms} onChange={e=>updateAnswers('terms', e.target.checked)} />
			<span className={`checkmark ${answers.terms ? 'active' : ''}`}></span>
		</label>
		{
			errors.terms &&
			<p className="text-red-400 italic">You need to at least accept terms and condition.</p>
		}
	</div>
}

export default OrgQuestions;