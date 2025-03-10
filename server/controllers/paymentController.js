const stripe = require("stripe")(process.env.STRIPE_SECRET)

exports.createSession = async (req, res) => {
    try {
        const { products, orderId } = req.body;

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Products are required and should be a non-empty array." });
        }

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "bgn",
                product_data: {
                    name: product.title,
                    images: Array.isArray(product.image) ? product.image : [product.image],
                },
                unit_amount: Math.round(product.unitPrice * 100), // Convert to stotinki
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:5173/success?orderId=${orderId}`,
            cancel_url: `http://localhost:5173/cancelled?orderId=${orderId}`,
        });
        console.log('Line Items:', lineItems);
        console.log('Session Created:', session);
        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error("Stripe Checkout session creation error:", error);
        res.status(500).json({ error: "Failed to create checkout session." });
    }
};

