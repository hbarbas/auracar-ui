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
                    v-model="car.id"
                    name="title"
                />
            </div>

            <div class="form-group">
                <label for="description">Model</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="car.model"
                    name="description"
                />
            </div>

            <div class="form-group">
                <label for="description">Car Registration</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="car.carRegistration"
                    name="description"
                />
            </div>

            <div class="form-group">
                <label for="description">Entry</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="car.entry"
                    name="description"
                />
            </div>

            <div class="form-group">
                <label for="description">Exit</label>
                <input
                    class="form-control"
                    id="description"
                    required
                    v-model="car.exit"
                    name="description"
                />
            </div>

            <button @click="saveCar"
                    class="btn btn-success">Submit
            </button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success"
                    @click="newCar">Add
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CarDataService from "@/services/CarDataService";
import Car from "@/types/Car";

@Component
export default class AddCar extends Vue {
    private car : Car = {
        id : "",
        carRegistration : "",
        model : "",
        entry : "",
        exit : "",
        active : false,
    };
    private submitted : boolean = false;

    saveCar() {
        let data = {
            id : this.car.id,
            model : this.car.model,
            carRegistration : this.car.carRegistration,
            entry : this.car.entry,
            exit : this.car.exit,
            active : true,
        };
        CarDataService.create( data )
        .then( ( response ) => {
            this.car.id = response.data.id;
            console.log( response.data );
            this.submitted = true;
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    newCar() {
        this.submitted = false;
        this.car = {} as Car;
    }
}
</script>

<style scoped>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>
