const Product = require('../models/Product');

exports.getProducts = async(req, res) => {
    try {
        const {category, minPrice, maxPrice, search, page, limit, sort} = req.query;
        let query = { isActive: true };

        if(category && category !== "All") {
            query.category = category;
        };

        if(minPrice || maxPrice) {
            query.price = {};
            if(minPrice) query.price.$gte = Number(minPrice);
            if(minPrice) query.price.$lte = Number(maxPrice);
        }

        limitNumber = parseInt(limit) || 12;

        const products = await Product.find(query)
        .sort({ createdAt: -1 })
        .limit(limitNumber);

        return res.json({
            success: true,
            count: products.length,
            // total: totalProducts,
            // page: pageNumber,
            // totalPages: Math.ceil(totalProducts / limitNumber),
            // limit: limitNumber,
            data: products,
        })
    } catch (error) {
        console.error("Error collecting product: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed collect product",
        });
    }
};

exports.getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error("Error getting product: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed find product",
        });
    }
};

exports.createProduct = async(req, res) => {
    try {
        const productData = { ...req,body };

        if(req.file) {
            productData.image = req.file.path;
        }

        const product = await Product.create(productData);
        return res.status(201).json({
            success: true,
            data: product,
        })
    } catch (error) {
        console.error("Error creating product: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed create product",
        });
    }
};

exports.updateProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }

        const updateData = { ...req.body };

        if(req.file) {
            if(product.image && product.image.includes('cloudinary')) {
                try {
                    const urlParts = product.image.split('/');
                    const publicIdWithExt = urlParts[urlParts.length - 1];
                    const publicId = publicIdWithExt.split('.')[0];
                    const folderPath = `health-ecommerce/products/${publicId}`;
                    await cloudinary.uploader.destroy(folderPath);
                } catch (error) {
                    console.warn("Failed to delete old product image: ", error.message);
                }
            }
            updateData.image = req.file.path;
        }

        Object.assign(product, updateData);
        await product.save();

        res.json({
            success: true,
            message: "Product updated",
            data: product,
        });
    } catch (error) {
        console.error("Error updating product: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed update product",
        })
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted",
        });

    } catch (error) {
        console.error("Error deleting product: ", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed delete product",
        });
    }
}

