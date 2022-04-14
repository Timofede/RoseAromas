// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "TEST-4370015989481007-122404-68d32c4cd240e87bf45a48259aade879-327820389" //DEV or PROD

});

// "items": [
    // {
    //   "title": "Dummy Title",
    //   "description": "Dummy description",
    //   "picture_url": "http://www.myapp.com/myimage.jpg",
    //   "category_id": "car_electronics",
    //   "quantity": 1,
    //   "currency_id": "U$",
    //   "unit_price": 10
    // }
//   ],
//   "payer": {
//     "phone": {},
//     "identification": {},
//     "address": {}
//   },




export default function(req, res) {
	return new Promise((resolve, reject) => {
		let preference = {
			items: req.body.items,
			// payer: req.body.payer,
			back_urls: {
				"success": "http://localhost:3000/feedback",
				"failure": "http://localhost:3000/feedback",
				"pending": "http://localhost:3000/feedback",
			},
			auto_return: "approved",
		};

		mercadopago.preferences.create(preference)
		.then(function (response) {
			// console.log(response.body)
			res.statusCode = 200
			res.setHeader('Content-type','application/json')
			console.log(response.body.init_point)
			res.json({
				id: response.body.id,
				redirect: response.body.init_point
			});
			resolve();

		}).catch(function (error) {
			console.log("TU ERROR ------------>",error)
			res.json(error);
			res.status(405).end();
			resolve();
		});

	});
	
	
}