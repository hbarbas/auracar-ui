<template>
    <el-table
        :data="cars"
        style="width: 100%">
        <el-table-column
            prop="id"
            label="Id"
            width="180">
        </el-table-column>
        <el-table-column
            prop="model"
            label="Modelo"
            width="180">
        </el-table-column>
        <el-table-column
            prop="carRegistration"
            label="Matricula"
            width="180">
        </el-table-column>
        <el-table-column
            prop="arrivalDay"
            label="Día de entrada"
            width="190">
        </el-table-column>
        <el-table-column
            prop="entryTime"
            label="Hora de entrada"
            width="190">
        </el-table-column>
        <el-table-column
            prop="exitTime"
            label="Hora de salida"
            width="190">
        </el-table-column>
    </el-table>
    <!--    <div class="list row">
            <div class="col-md-8">
                <div class="input-group mb-3">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Search by title"
                        v-model="title"
                    />
                    <div class="input-group-append">
                        <button
                            class="btn btn-outline-secondary"
                            type="button"
                            @click="searchTitle"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h4>Listado de coches</h4>
                <ul class="list-group">
                    <li
                        class="list-group-item"
                        :class="{ active: index === currentIndex }"
                        v-for="(car, index) in cars"
                        :key="index"
                        @click="setActiveCar(car, index)"
                    >
                        {{ car.id }}
                    </li>
                </ul>

                <button class="m-3 btn btn-sm btn-danger"
                        @click="removeAllCars">
                    Remove All
                </button>
            </div>
            <div class="col-md-6">
                <div v-if="currentCar.id">
                    <h4>Car</h4>
                    <div>
                        <label><strong>Title:</strong></label> {{ currentCar.id }}
                    </div>
                    <div>
                        <label><strong>Model:</strong></label>
                        {{ currentCar.model }}
                    </div>
                    <div>
                        <label><strong>Car Registration:</strong></label>
                        {{ currentCar.carRegistration }}
                    </div>
                    <div>
                        <label><strong>Entry:</strong></label>
                        {{ currentCar.entry }}
                    </div>
                    <div>
                        <label><strong>Exit:</strong></label>
                        {{ currentCar.exit }}
                    </div>
                    <div>
                        <label><strong>Active:</strong></label>
                        {{ currentCar.active ? "Si" : "No" }}
                    </div>

                    <a
                        class="badge badge-warning"
                        :href="'/cars/' + currentCar.id"
                    >
                        Edit
                    </a>
                </div>
                <div v-else>
                    <br/>
                    <p>Por favor seleccione coches...</p>
                </div>
            </div>
        </div>-->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CarDataService from "@/services/CarDataService";
import Car from "@/types/Car";

@Component
export default class CarsList extends Vue {
    private cars : Car[] = [];
    private currentCar = {} as Car;
    private currentIndex : number = - 1;
    private title : string = "";

    retrieveCars() {
        CarDataService.getAll()
        .then( ( response ) => {
            this.cars = response.data;
            console.log( response.data );
        } )
        .catch( ( e ) => {
            console.log( e );
        } );
    }

    /*    refreshList() {
            this.retrieveCars();
            this.currentCar = {} as Car;
            this.currentIndex = - 1;
        }

        setActiveCar( car : Car, index : number ) {
            this.currentCar = car;
            this.currentIndex = index;
        }

        removeAllCars() {
            CarDataService.deleteAll()
            .then( ( response ) => {
                console.log( response.data );
                this.refreshList();
            } )
            .catch( ( e ) => {
                console.log( e );
            } );
        }

        searchTitle() {
            CarDataService.findByRegistration( this.title )
            .then( ( response ) => {
                this.cars = response.data;
                console.log( response.data );
            } )
            .catch( ( e ) => {
                console.log( e );
            } );
        }*/

    mounted() {
        this.retrieveCars();
    }
}
</script>

<style scoped>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>
