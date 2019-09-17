export default function getResources({
	id,
	structureOnly
}) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(
			'GET',
			`http://api.zucali.com/resources${id > -1 ? `/${id}` : ''}${structureOnly ? '?structure_only&limit=99999' : ''}`,
			true
		);
		xhr.responseType = 'json';
			
		xhr.onload = function() {
			let status = xhr.status;
				
			if (status === 200) {
				resolve(xhr.response);
			}
			else {
				reject(
					Error(`getResources failed with status ${status}`)
				);
			}
		};
			
		xhr.send();
	});
}