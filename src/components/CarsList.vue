<template>
    <el-table
        :data="cars"
        border
        style="max-width: 100%"
        :row-class-name="tableRowClassName">
        <!--        :header-row-class-name="headerRowClassName">-->
        <el-table-column
            prop="id"
            label="ID">
        </el-table-column>
        <el-table-column
            prop="model"
            label="MODELO">
        </el-table-column>
        <el-table-column
            prop="carRegistration"
            label="MATRÍCULA">
        </el-table-column>
        <el-table-column
            prop="arrivalDay"
            label="DÍA DE ENTRADA">
        </el-table-column>
        <el-table-column
            prop="entryTime"
            label="HORA DE ENTRADA">
        </el-table-column>
        <el-table-column
            prop="exitTime"
            label="HORA DE SALIDA">
        </el-table-column>
        <el-table-column
            prop="countdown"
            label="MINUTOS RESTANTES">
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

    /*    private currentCar = {} as Car;
        private currentIndex : number = - 1;
        private title : string = "";*/

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

    tableRowClassName( row : any ) {
        const countdown = row.row.countdown;
        if( countdown < 30 && countdown > 10 ) {
            return "warning-row";
        }
        else if( countdown < 10 ) {
            return "danger-row";
        }
        else {
            return "success-row";
        }
    }

    // headerRowClassName(row: any) {
    //     return 'el-table header-row';
    // }
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
        window.setInterval( () => {
            this.retrieveCars();
        }, 10000 );
    }
}
</script>

<style>
.el-table .danger-row {
    background: #ff9371;
    /*border-spacing: 10cm;*/
}

.el-table .warning-row {
    background: #ffe650;
}

.el-table .success-row {
    background: #d1ffc1;
}

/*.el-table .header-row {*/
/*    background: #d1ffc1;*/
/*}*/

</style>
