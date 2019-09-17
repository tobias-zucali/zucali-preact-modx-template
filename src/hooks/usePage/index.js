import { useEffect, useState } from 'preact/hooks';
import getResources from '../../utils/getResources';

const pageCache = {};

export default function usePage(id) {
	const cachedPage = pageCache[id];
	const [page, setPage] = useState(cachedPage);
	useEffect(async () => {
		if (cachedPage) {
			setPage(cachedPage);
		}
		const { results } = await getResources({ id });
		setPage(results);
	}, [id]);
	return page;
}
