<template>
    <div v-if="currentCar.id"
         class="edit-form">
        <h4>Car</h4>
        <form>
            <div class="form-group">
                <label for="title">Id</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="currentCar.id"
                />
            </div>
            <div class="form-group">
                <label for="description">Model</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentCar.model"
                />
            </div>
            <div class="form-group">
                <label for="description">Car Registration</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentCar.carRegistration"
                />
            </div>
            <div class="form-group">
                <label for="description">Entry</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentCar.entry"
                />
            </div>
            <div class="form-group">
                <label for="description">Exit</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentCar.exit"
                />
            </div>
            <div class="form-group">
                <label><strong>Active:</strong></label>
                {{ currentCar.active ? "Si" : "No" }}
            </div>
        </form>

        <button
            class="badge badge-primary mr-2"
            v-if="currentCar.active"
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
                @click="deleteCar">
            Delete
        </button>

        <button type="submit"
                class="badge badge-success"
                @click="updateCar">
            Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br/>
        <p>Please click on a Car...</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CarDataService from "@/services/CarDataService";
import Car from "@/types/Car";

@Component
export default class CarDetails extends Vue {
    private currentCar = {} as Car;
    private message : string = "";

    getCar( id : string ) {
        CarDataService.get( id )
        .then( ( response ) => {
            this.currentCar = response.data;
            console.log( response.data );
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    updatePublished( status : boolean ) {
        let data = {
            id : this.currentCar.id,
            model : this.currentCar.model,
            carRegistration : this.currentCar.carRegistration,
            entry : this.currentCar.entry,
            exit : this.currentCar.exit,
            active : status,
        };
        CarDataService.update( data )
        .then( ( response ) => {
            this.currentCar.active = status;
            console.log( response.data );
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    updateCar() {
        CarDataService.update( this.currentCar )
        .then( ( response ) => {
            console.log( response.data );
            this.message = "The car was updated successfully!";
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    deleteCar() {
        CarDataService.delete( this.currentCar.id )
        .then( ( response ) => {
            console.log( response.data );
            this.$router.push( { name : "cars" } );
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    mounted() {
        this.message = "";
        this.getCar( this.$route.params.id );
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>
