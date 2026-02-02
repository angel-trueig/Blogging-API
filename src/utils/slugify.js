import slugify from "slugify";

export const generateSlug = async (Model, title) => {
    let baseSlug = slugify(title, {
        lower: true,
        strict: true,
        trim: true
    });

    let slug = baseSlug;
    let count = 1;

    while (await Model.findOne({ where: { slug } })) {
        slug = `${baseSlug}-${count++}`;
    }

    return slug;
};
