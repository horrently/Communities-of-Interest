import { createWebHistory, createRouter } from "vue-router";

// Импорт компонентов
import CommunityList from "./components/CommunityList.vue";
import CommunityForm from "./components/CommunityForm.vue";
import CommunityDetails from "./components/CommunityDetails.vue";
import UserProfile from "./components/UserProfile.vue";
import SuggestInterest from './components/SuggestInterest.vue';
import MyCommunities from './components/MyCommunities.vue';
import SuggestedInterests from './components/SuggestedInterests.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';


// Определяем маршруты
const routes = [
    {
        path: "/communities",
        name: "community-list",
        component: CommunityList,
        meta: { title: "Список сообществ", requiredAuth: true }
    },
    {
        path: "/community/add",
        name: "community-add",
        component: CommunityForm,
        meta: { title: "Создать сообщество", requiredAuth: true }
    },
    {
        path: "/community/:id",
        name: "community-details",
        component: CommunityDetails,
        props: true,
        meta: { title: "Детали сообщества", requiredAuth: true }
    },
    {
        path: "/profile",
        name: "user-profile",
        component: UserProfile,
        meta: { title: "Профиль пользователя", requiredAuth: true }
    },
    {
        path: '/suggest-interest',
        name: 'suggest-interest',
        component: SuggestInterest,
        meta: { title: "Предложить интерес", requiredAuth: true }
    },
    {
        path: '/my-communities',
        name: 'my-communities',
        component: MyCommunities,
        meta: { title: "Мои сообщества", requiredAuth: true }
    },
    {
        path: '/suggested-interest',
        name: 'suggested-interest',
        component: SuggestedInterests,
        meta: { title: "Предложенные интересы", requiredAuth: true, requiredAdmin: true }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { title: "Авторизация" }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { title: "Регистрация" }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

import store from "./store/index";

// указание заголовка компонентам (тега title), заголовки определены в meta
router.beforeEach(async (to, from, next) => {
    // для тех маршрутов, для которых не определены компоненты, подключается только App.vue
    // поэтому устанавливаем заголовком по умолчанию название "Главная страница"
    document.title = to.meta.title || 'Главная страница';

    // проверяем наличие токена и срок его действия
    const auth = await store.getters["auth/isTokenActive"];
    // const user = store.state.auth.user;
    if (auth) {
        return next();
    }
    // если токена нет или его срок действия истёк, а страница доступна только авторизованному пользователю,
    // то переходим на страницу входа в систему (ссылка на /login)
    else if (!auth && to.meta.requiredAuth) {
        const user = JSON.parse(localStorage.getItem("user"));
        await store.dispatch("auth/refreshToken", user)
            .then(() => {
                return next();
            })
            .catch(() => {
                return next({path: "/login"});
            });
        return next({ path: "/login" });
    }
    // if (to.meta.requiredAdmin && (!user || user.role !== 'admin')) {
    //     return next({ path: "/communities" }); // перенаправляем обычных пользователей на страницу сообществ
    // }

    return next();
});

export default router;