const url = 'https://porn-xnxx-api.p.rapidapi.com/download';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': '31c378abd1msha07c10abd9b09dfp138d17jsn01e9099a130c',
		'x-rapidapi-host': 'porn-xnxx-api.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: {
		video_link: 'https://xnxx.com/video-wugb904/fucking_his_step_sister_lexxi_steele_in_high_definition'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}