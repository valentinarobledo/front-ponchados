<template>
	<div class="ask-page">
		<div class="container">
			<button v-b-modal.createQues class="btn btn-create" v-if="user.rolId == 1">Crear Cuestionario</button>
			<div class="table">
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Nombre</th>
							<th>Preguntas</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in questionnaires" :key="index">
							<td>{{index + 1}}</td>
							<td>{{item.name}}</td>
							<td>{{item.questions}}</td>
							<td>	
								<router-link class="btn btn-acept btn-md" :to="{ name: 'question', params: { qId: item.id } }">Ver</router-link>
								<button class="btn btn-close btn-md" v-on:click="saveQues(item)" v-b-modal.delModal v-if="user.rolId == 1">Eliminar</button>
								<button class="btn btn-play btn-md">
									<router-link class="btn2" :to="{name: 'game'}">Jugar</router-link>
								</button>
							</td>							
						</tr>
					</tbody>
				</table>
			</div>	
		</div>
		<b-modal id="createQues" ref="createQues" hide-footer  size="md" centered>
	 		<div>
	 			<input type="text" class="form-control" placeholder="Nombre del Cuestionario" v-model="form.name">
	 			<input  type="file" placeholder="Subir Archivos">
	 		<button class="btn btn-game" v-on:click="create()" >Crear</button>
	 		<button class="btn btn-close" v-on:click="closeModal()">Cancelar</button>
	 	</div>
	 	</b-modal>
		<b-modal id="viewModal" ref="viewModal" hide-footer title="Cuestionario" size="lg">
				<div class="table">
					<table>
							<thead>
								<tr>
										<th></th>
										<th>Pregunta</th>
										<th>Puntos</th>
										<th>Tiempo</th>
										<th>Respuestas</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item, index) in questions" :key="index">
									<td>{{index + 1}}</td>
									<td>{{ item.question }}</td>	
									<td>{{item.points}}</td>			
									<td>{{item.time}}</td>		
									<td>
										<div class="row">
											<div class="col-md-6" v-for="(item, index) in answers" :key="index">
													<td>{{item.answer}}</td>
											</div>
										</div>
									</td>	
								</tr>
							</tbody>
					</table>
				</div>
		</b-modal>
		<b-modal id="delModal" ref="delModal" hide-footer>
				<b-alert show variant="warning">Esta acción es irreversible. ¿Desea borrar el cuestionario?</b-alert>
				<button class="btn btn-close" v-on:click="del()">Borrar</button>
		</b-modal>
</div>
</template>

<script>

import { mapGetters } from "vuex";
import {
	QUES_INDEX,
	QUES_DELETE,
	QUES_VIEW,
	QUES_CREATE

} 
from "@/store/actions.type";

export default {
	computed: {
		...mapGetters(["user"])

	},
 	data: function() {
	    return {
	      	form: {},
	      	curItem: {},     
	      	filters:{},
	      	questionnaires: [], 	
	      	questions: [],	
	      	answers: []	
		}
	},
	methods: {
		closeModal() {
			this.$refs.createQues.hide();
		},
		saveQues(item) {
			this.curItem = item;
		},
		clean() {
			console.log('entro a borrar')
			this.curItem = {};
		},
		ques(){
			this.$store.dispatch(QUES_INDEX, this.filters)
			.then( questionnaires => {
				this.questionnaires = questionnaires;
			})
			.catch( err => {
				this.$snotify.error(err.message);
			});
		},
		del(){
			this.$refs.delModal.hide();
			this.$store.dispatch(QUES_DELETE, this.curItem)
			.then( result => {						
				this.clean();				
				this.ques();
				this.$snotify.success(result.message);
			})
			.catch( err => {
				this.$snotify.error(err.message);
			});
		},

		create(){
			this.$refs.createQues.hide();
			this.$store.dispatch(QUES_CREATE, this.form)
			.then( result => {
				this.clean();
				this.ques();
				this.$snotify.success(result.message);
			})
		},
		view(item){
			console.log("Ver");
			this.$store.dispatch(QUES_VIEW, item)
			.then( result => {
				this.questions = result;
			})
			.catch( err => {
				this.$snotify.error(err.message);
			});
		}
	},
	mounted () {
		this.ques();
	}
}
</script>

<style lang="scss">
.ask-page{
	padding: 30px;
	min-height: 100vh;

	.btn-create{
		float: right;
		margin-left: 120px;
		border-radius: 15px;
		background: #8549BA;
		font-family: sans-serif;
		color:white;
		font-weight: bold;
		border-bottom: 5px solid #1d0531;
		&:hover{
			border-bottom: 0px solid #1d0531;
			background:#A560EB;
			margin-top: 5px;			
		}
	}

	.btn-close{
		margin-top: 15px;
		background: #E53B3B;
		border-bottom: 3px solid #82141e;
		border-radius: 15px;
		margin-left: 15px;
		color: white;
		font-weight: bold;
		&:hover{
			background:#FF9797;
		}
	}
	.btn-acept{
		margin-top: 15px;
		background: #1CB0F6;
		border-bottom: 3px solid #05587f;
		border-radius: 15px;
		margin-left: 15px;
		color: white;
		font-weight: bold;
		&:hover{
			background: #85C1E9;
		}
	}
	.btn-play{
		margin-left: 15px;
		border-bottom: 3px solid #035600;
		color: white;
		font-weight: bold;
		&:hover{
			background: #BFF199;
		}
	}

	.btn2{
		text-decoration: none;
		color: white; 
	}
}

</style>