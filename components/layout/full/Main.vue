<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import sidebarItems from '@/components/layout/full/vertical-sidebar/sidebarItem';
import { Menu2Icon } from 'vue-tabler-icons';

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);
const { user } = useAuth();
const router = useRouter() as any;
const userRole = computed(() => JSON.parse(user.value as any)?.role || "");

const filteredSidebarMenu = computed(() => {
    return sidebarMenu.value.filter((item) => {
        if (!item.access) return true;
        return item.access.includes(userRole.value);
    });
});
</script>

<template>
    <!------Sidebar-------->
    <v-navigation-drawer left elevation="0" app class="leftSidebar" v-model="sDrawer">
        <!---Logo part -->
        <div class="d-flex justify-center align-center py-4">
            <!-- <LayoutFullLogo /> -->
            <img src="/images/background/play-game.png" style="width: 40px;" alt="background" />
            <h3 class="text-h3 font-weight-bold text-center">Esport Merdeka</h3>
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <div>
            <perfect-scrollbar class="scrollnavbar">
                <v-list class="pa-6">
                    <!---Menu Loop -->
                    <template v-for="(item, i) in filteredSidebarMenu">
                        <!---Item Sub Header -->
                        <LayoutFullVerticalSidebarNavGroup :item="item" v-if="item.header" :key="item.title" />

                        <!---Single Item-->
                        <LayoutFullVerticalSidebarNavItem :item="item" v-else class="leftPadding" />
                        <!---End Single Item-->
                    </template>
                </v-list>
                <!-- <div class="pa-4">
                    <LayoutFullVerticalSidebarExtraBox />
                </div> -->
            </perfect-scrollbar>
        </div>

    </v-navigation-drawer>
    <!------Header-------->
    <v-app-bar elevation="0" height="70">
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <v-btn class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted" @click="sDrawer = !sDrawer" icon
                    variant="flat" size="small">
                    <Menu2Icon size="20" stroke-width="1.5" />
                </v-btn>
                <v-text class=" ms-md-3 ms-sm-5 ms-3 text-h5">{{
                    (router.currentRoute.value.name.split('-')?.[2] ||
                        router.currentRoute.value.name.split('-')?.[1]).replace(/([A-Z])/g, ' $1').trim() || 'data'
                }}</v-text>
                <!-- Notification -->
                <!-- <LayoutFullVerticalHeaderNotificationDD /> -->
            </div>
            <div class="d-flex align-center">
                <div class="text-body-1">{{ JSON.parse(user as any)?.name || '' }}</div>
                <!-- User Profile -->
                <LayoutFullVerticalHeaderProfileDD />
            </div>
        </div>
    </v-app-bar>
</template>
