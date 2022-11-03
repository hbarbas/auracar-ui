<template>
    <div v-if="currentTutorial.id"
         class="edit-form">
        <h4>Tutorial</h4>
        <form>
            <div class="form-group">
                <label for="title">Id</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="currentTutorial.id"
                />
            </div>
            <div class="form-group">
                <label for="description">Model</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentTutorial.model"
                />
            </div>
            <div class="form-group">
                <label for="description">Car Registration</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentTutorial.carRegistration"
                />
            </div>
            <div class="form-group">
                <label for="description">Entry</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentTutorial.entry"
                />
            </div>
            <div class="form-group">
                <label for="description">Exit</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentTutorial.exit"
                />
            </div>
            <div class="form-group">
                <label><strong>Active:</strong></label>
                {{ currentTutorial.active ? "Si" : "No" }}
            </div>
        </form>

        <button
            class="badge badge-primary mr-2"
            v-if="currentTutorial.active"
            @click="updatePublished(false)"
        >
            UnPublish
        </button>
        <button
            v-else
            class="badge badge-primary mr-2"
            @click="updatePublished(true)"
        >
            Publish
        </button>

        <button class="badge badge-danger mr-2"
                @click="deleteTutorial">
            Delete
        </button>

        <button type="submit"
                class="badge badge-success"
                @click="updateTutorial">
            Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br/>
        <p>Please click on a Tutorial...</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";

@Component
export default class TutorialDetails extends Vue {
    private currentTutorial = {} as Tutorial;
    private message : string = "";

    getTutorial( id : string ) {
        TutorialDataService.get( id )
        .then( ( response ) => {
            this.currentTutorial = response.data;
            console.log( response.data );
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    updatePublished( status : boolean ) {
        let data = {
            id : this.currentTutorial.id,
            model : this.currentTutorial.model,
            carRegistration : this.currentTutorial.carRegistration,
            entry : this.currentTutorial.entry,
            exit : this.currentTutorial.exit,
            active : status,
        };
        TutorialDataService.update( data )
        .then( ( response ) => {
            this.currentTutorial.active = status;
            console.log( response.data );
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    updateTutorial() {
        TutorialDataService.update( this.currentTutorial )
        .then( ( response ) => {
            console.log( response.data );
            this.message = "The tutorial was updated successfully!";
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    deleteTutorial() {
        TutorialDataService.delete( this.currentTutorial.id )
        .then( ( response ) => {
            console.log( response.data );
            this.$router.push( { name : "tutorials" } );
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    mounted() {
        this.message = "";
        this.getTutorial( this.$route.params.id );
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>
