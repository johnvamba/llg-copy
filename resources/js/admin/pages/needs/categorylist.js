//Depreciate me
import {	
	Advocacy,
	Children,
	Youth,
	MentalHealth,
	Housing,
	Health,
	Food,
	EverydayThings,
	Education,
	Domestic,
	//volunteer
	Employment,
	Mechanic,
	Cleaning,
	Removalist,
	Tutor,
	Counselling,
	LegalAssistance,
	Translation,
	Handyman,
	Gardener,
	Driver,
	Cook,
	Hairdresser,
	Other,
	Prison,
	Senior,
	Migrants,
	Homelessness,
	Fostercare
} from './categories'

export const monetary = [
	{
		name: 'Housing',
		slug: 'housing',
		svg_class: Housing
	},
	{
		name: 'Food',
		slug: 'food',
		svg_class: Food
	},
	{
		name: 'Everyday Things',
		slug: 'everyday_things',
		svg_class: EverydayThings
	},
	{
		name: 'Health',
		slug: 'health',
		svg_class: Health
	},
	{
		name: 'Mental Health',
		slug: 'mental_Health',
		svg_class: MentalHealth
	},
	{
		name: 'Domestic & Family Violence',
		slug: 'domestic',
		svg_class: Domestic
	},
	{
		name: 'Education',
		slug: 'education',
		svg_class: Education
	},
	{
		name: 'Advocacy',
		slug: 'advocacy',
		svg_class: Advocacy
	},
	{
		name: 'Children',
		slug: 'children',
		svg_class: Children
	},
	{
		name: 'Youth',
		slug: 'youth',
		svg_class: Youth
	},{
		name: 'Prison',
		slug: 'prison',
		svg_class: Prison
	},{
		name: 'Seniors',
		slug: 'seniors',
		svg_class: Senior
	},{
		name: 'Migrants',
		slug: 'migrants',
		svg_class: Migrants
	},{
		name: 'Homeless',
		slug: 'homelessness',
		svg_class: Homelessness
	},{
		name: 'Fostercare',
		slug: 'fostercare',
		svg_class: Fostercare
	}

];

export const volunteer = [
	{
		name: 'Employment',
		slug: 'employment',
		svg_class: Employment
	},
	{
		name: 'Mechanic',
		slug: 'mechanic',
		svg_class: Mechanic
	},
	{
		name: 'Cleaning',
		slug: 'cleaning',
		svg_class: Cleaning
	},
	{
		name: 'Removalist',
		slug: 'removalist',
		svg_class: Removalist
	},
	{
		name: 'Tutor',
		slug: 'tutor',
		svg_class: Tutor
	},
	{
		name: 'Counselling',
		slug: 'counselling',
		svg_class: Counselling
	},
	{
		name: 'Legal Assistance',
		slug: 'legalassistance',
		svg_class: LegalAssistance
	},
	{
		name: 'Translation',
		slug: 'translation',
		svg_class: Translation
	},
	{
		name: 'Handyman',
		slug: 'handyman',
		svg_class: Handyman
	},
	{
		name: 'Gardener',
		slug: 'gardener',
		svg_class: Gardener
	},
	{
		name: 'Driver',
		slug: 'driver',
		svg_class: Driver
	},
	{
		name: 'Cook',
		slug: 'cook',
		svg_class: Cook
	},
	{
		name: 'Hairdresser',
		slug: 'hairdresser',
		svg_class: Hairdresser
	},
	{
		name: 'Other',
		slug: 'other',
		svg_class: Other
	}
]

export const all = [...monetary, ...volunteer];