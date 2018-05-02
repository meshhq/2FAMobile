/**
 * Below are the Mock Responses used with Nock for
 * when we're testing without running the server
 * locally. Find these in use in 'NetworkService.test.js'
 */
export let createKeyResponse = () => {
	return {
		"timestamp": 1516814555,
		"message": "Success.",
		"data": {
			"ID": 1,
			"CreatedAt": "2018-01-24T09:22:35.947873-08:00",
			"UpdatedAt": "2018-01-24T09:22:35.947873-08:00",
			"DeletedAt": null,
			"key": "e890b5b83a133b70cea4b069f401baf4",
			"user_id": "MeshStudio",
			"provider": "Github"
		}
	}
}

export let updateKeyResponse = () => {
	return {
		"timestamp": 1516814722,
		"message": "Success.",
		"data": null
	}
}

export let getKeysResponse = () => {
	return {
		"timestamp": 1516814674,
		"message": "Success.",
		"data": [
			{
				"ID": "1",
				"CreatedAt": "2018-01-22T08:47:59.574354-08:00",
				"UpdatedAt": "2018-01-22T08:47:59.574354-08:00",
				"DeletedAt": null,
				"key": "01133b70cea890b5b83ea69ea69f4f4a2",
				"code": "5269584",
				"user_id": "MeshStudio",
				"provider": "Mesh"
			},
			{
				"ID": "2",
				"CreatedAt": "2018-01-22T10:40:08.539041-08:00",
				"UpdatedAt": "2018-01-22T10:40:08.539041-08:00",
				"DeletedAt": null,
				"key": "e890b5b83a133b70cea4b069f401baf4",
				"code": "9685324",
				"user_id": "MeshStudio",
				"provider": "Github"
			}
		]
	}
}

export let deleteKeysResponse = () => {
	return {
		"timestamp": 1516814864,
		"message": "Success.",
		"data": null
	}
}