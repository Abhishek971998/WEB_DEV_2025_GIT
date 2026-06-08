// Without a barrel: one line per file
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";
import { slugify } from "../utils/slugify";

// With the barrel: one tidy line --index.js or ts is called barrel file
import { formatDate, formatPrice, slugify } from "../utils";

// ---------------------------- IMPORTANT ----------------------------

// 1. Always use the barrel file to import all the functions from the utils folder
// 2. Barrel file is a file that exports all the functions from the utils folder
// 3. Barrel file is a file that imports all the functions from the utils folder
// 4 Barrel file also creates a index.js file in the utils folder
// 5. The useEffect callback must return either nothing or a cleanup function.
