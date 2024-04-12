"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ArticleController_1 = require("../controllers/ArticleController");
const isAuth_1 = require("../../../middlewares/isAuth");
const router = express_1.default.Router();
router.get('/', ArticleController_1.getAllArticles);
router.get('/:title', ArticleController_1.getArticleByTitle);
router.get('/create', isAuth_1.isAuth, ArticleController_1.createArticle);
exports.default = router;
