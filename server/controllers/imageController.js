const getStoryImage = async (req, res) => {
    try {
        const { title, theme, emotion } = req.query;

        const query =
            `${title || ""} ${theme || ""} ${emotion || ""} children story illustration`.trim();

        const url =
            `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}` +
            `&q=${encodeURIComponent(query)}` +
            `&image_type=illustration` +
            `&orientation=horizontal` +
            `&safesearch=true` +
            `&per_page=5`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Pixabay request failed");
        }

        const data = await response.json();

        if (!data.hits || data.hits.length === 0) {
            return res.json({
                image:
                    "https://cdn.pixabay.com/photo/2017/01/31/13/14/animal-2023924_1280.png"
            });
        }

        const photo =
            data.hits[
                Math.floor(Math.random() * data.hits.length)
            ];

        res.json({
            image:
                photo.webformatURL ||
                photo.largeImageURL,

            preview:
                photo.previewURL,

            source: "Pixabay",

            author:
                photo.user
        });

    } catch (err) {
        console.error(
            "Image API error:",
            err.message
        );

        res.status(500).json({
            message: "Unable to fetch image"
        });
    }
};

module.exports = {
    getStoryImage
};
