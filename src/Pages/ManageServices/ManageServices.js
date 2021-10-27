import React, { useEffect, useState } from 'react';

const ManageServices = () => {
	const [services, setServices] = useState([]);
	useEffect(() => {
		fetch('https://serene-inlet-83117.herokuapp.com/services')
			.then(res => res.json())
			.then(data => setServices(data))

	}, []);

	const handleDelete = id => {
		const url = `https://serene-inlet-83117.herokuapp.com/services/${id}`;
		fetch(url, {
			method: 'DELETE'
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.deletedCount) {
					alert('deleted succesfully')
					const remaining = services.filter(service => service._id !== id);
					setServices(remaining);

				}

			})
	}
	return (
		<div>
			<h2>Manage Services</h2>
			{
				services.map(service => <div
					key={service._id}
				>
					<h3>{service.name}</h3>
					<button onClick={() => handleDelete(service._id)}>Delete</button>


				</div>)
			}
		</div>
	);
};

export default ManageServices;