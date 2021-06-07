import React from 'react';

const Yes = () => <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect opacity="0.12" width="29" height="28" rx="14" fill="#52CC8A"/>
  <path d="M20.7628 10H19.4414C19.154 10 18.8808 10.1381 18.7117 10.3747L14.2828 16.5166L12.2768 13.733C12.1078 13.4992 11.8373 13.3583 11.5471 13.3583H10.2257C10.0426 13.3583 9.93556 13.5668 10.0426 13.7161L13.5531 18.5846C13.636 18.7003 13.7453 18.7946 13.872 18.8597C13.9986 18.9248 14.139 18.9587 14.2814 18.9587C14.4238 18.9587 14.5641 18.9248 14.6908 18.8597C14.8174 18.7946 14.9267 18.7003 15.0097 18.5846L20.9431 10.3578C21.053 10.2085 20.9459 10 20.7628 10Z" fill="#52CC8A"/>
</svg>

const No = ()=> <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect opacity="0.12" width="29" height="28" rx="14" fill="#98999B"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M18.8537 18.5607C18.6584 18.7559 18.3419 18.7559 18.1466 18.5607L10.3537 10.7678C10.1584 10.5725 10.1584 10.2559 10.3537 10.0607L11.0608 9.35355C11.2561 9.15829 11.5727 9.15829 11.7679 9.35355L19.5608 17.1464C19.7561 17.3417 19.7561 17.6583 19.5608 17.8536L18.8537 18.5607Z" fill="#98999B"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M11.0607 18.5607C11.2559 18.7559 11.5725 18.7559 11.7678 18.5607L19.5607 10.7678C19.7559 10.5725 19.7559 10.2559 19.5607 10.0607L18.8536 9.35355C18.6583 9.15829 18.3417 9.15829 18.1464 9.35355L10.3536 17.1464C10.1583 17.3417 10.1583 17.6583 10.3536 17.8536L11.0607 18.5607Z" fill="#98999B"/>
</svg>

const TabQuestions = ({ acnc= false, fundraiser= false, insured= false, stripe=false, taxable = false, benevity = false}) => {
    return (
        <section className="tab-question">
           <ul>
               <li>
               		<p> Is your organisation registered with ACNC?</p>
               		{ acnc ? <Yes /> : <No /> }
               </li>
               <li>
               		<p>Are you registered for fundraising?</p>
               		{ fundraiser ? <Yes /> : <No /> }
               </li>
               <li>
               		<p> Do you have public liability insurance? </p>
               		{ insured ? <Yes /> : <No />}
               </li>
               <li>
                  <p> Are you registered as a tax deductible gift recipient? </p>
                  { taxable ? <Yes /> : <No />}
               </li>
               <li>
                  <p> Stripe details added </p>
                  { stripe ? <Yes /> : <No /> }
               </li>
{/*               <li>
                  <p> Benevity Verified </p>
                  { benevity ? <Yes /> : <No /> }
               </li>*/}
           </ul>
        </section>
    )
}

export default TabQuestions;