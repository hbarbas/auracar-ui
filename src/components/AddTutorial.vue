<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Id</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    required
                    v-model="tutorial.id"
                    name="title"
                />
            </div>

            <div class="form-group">
                <label for="description">Model</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="tutorial.model"
                    name="description"
                />
            </div>

            <div class="form-group">
                <label for="description">Car Registration</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="tutorial.carRegistration"
                    name="description"
                />
            </div>

            <div class="form-group">
                <label for="description">Entry</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="tutorial.entry"
                    name="description"
                />
            </div>

            <div class="form-group">
                <label for="description">Exit</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="tutorial.exit"
                    name="description"
                />
            </div>

            <button @click="saveTutorial"
                    class="btn btn-success">Submit
            </button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success"
                    @click="newTutorial">Add
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";

@Component
export default class AddTutorial extends Vue {
    private tutorial : Tutorial = {
        id : "",
        carRegistration : "",
        model : "",
        entry : "",
        exit : "",
        active : false,
    };
    private submitted : boolean = false;

    saveTutorial() {
        let data = {
            id : this.tutorial.id,
            model : this.tutorial.model,
            carRegistration : this.tutorial.carRegistration,
            entry : this.tutorial.entry,
            exit : this.tutorial.exit,
            active : true,
        };
        TutorialDataService.create( data )
        .then( ( response ) => {
            this.tutorial.id = response.data.id;
            console.log( response.data );
            this.submitted = true;
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    newTutorial() {
        this.submitted = false;
        this.tutorial = {} as Tutorial;
    }
}
</script>

<style scoped>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>
