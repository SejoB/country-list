const FORM_LABELS = [
	'Company Name',
	'Contact Name',
	'Contact Title',
	'Address',
	'City',
	'Postal Code',
	'Country'
]
export const filterCustomerData = data => {
	if (data) {
		return Object.entries(data).reduce((result, field) => {
			FORM_LABELS.forEach(i => {
				if (i.replace(/\s/g, '') === field[0]) {
					result.push(field[1])
				}
			})
			return result
		}, [])
	}
}
export const customerObject = (data = '') => {
	return FORM_LABELS.reduce((total, value, index) => {
		return [
			...total,
			{
				name: value.replace(/\s/g, ''),
				data: data[index],
				value: '',
				id: index,
				label: value
			}
		]
	}, [])
}
export const sortData = (data, resProp, sortProp, sortOrder = 1) => {
	let obj = {}
	data.forEach(i => {
		let k = i[resProp]
		if (k in obj) {
			obj[k].add(i[sortProp])
		} else {
			obj[k] = new Set()
		}
	})
	for (let n in obj) {
		obj[n] = Array.from(obj[n]).length
	}
	obj = Object.entries(obj)
	obj.sort((a, b) => (a[1] - b[1]) * sortOrder)
	return obj
}
export const groupeCities = data => {
	const arrCities = sortData(data, 'City', 'Company', -1)
	let obj = {}
	data.forEach(i => {
		let k = i['Country'],
			j = i['City']
		if (k in obj) {
			obj[k].add(j)
		} else {
			obj[k] = new Set()
			obj[k].add(j)
		}
	})
	for (let n in obj) {
		obj[n] = arrCities
			.filter(city => {
				return Array.from(obj[n]).includes(city[0])
			})
			.map(i => i[0])
	}
	return obj
}
export const groupeCompanies = data => {
	let obj = {}
	data.forEach(i => {
		let k = i['City'],
			j = i['CompanyName']
		if (k in obj) {
			obj[k].add(j)
		} else {
			obj[k] = new Set()
			obj[k].add(j)
		}
	})
	let tmp
	for (let n in obj) {
		tmp = Array.from(obj[n])
		tmp.sort((a, b) => {
			if (a > b) return 1
			if (a < b) return -1
			return 0
		})
		obj[n] = tmp
	}
	return obj
}
