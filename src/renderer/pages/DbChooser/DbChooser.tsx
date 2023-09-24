import React, { useState } from 'react';

function DbChooser() {
	const [previousDbs, setPreviousDbs] = useState<string[]>();

	async function fetchPreviousDbs() {
		await window.electron.ipcRenderer.on('get-all-dbs', (arg) => {
			setPreviousDbs(arg as string[]);
		});
	}
	window.electron.ipcRenderer.sendMessage('get-all-dbs');
	fetchPreviousDbs();

	const items = previousDbs?.map((db) => {
		return <li key={db}>{db}</li>;
	});

	return (
		<div>
			<div className="previousDbs">
				<ul>{items}</ul>
			</div>
		</div>
	);
}

export default DbChooser;
