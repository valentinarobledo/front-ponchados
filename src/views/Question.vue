<template>
	<div class="question-page">
		<div class="button">
			<button class="btn btn-add" v-b-modal.addQuestion>
				Agregar pregunta</button>
			<a class="btn btn-read" :href="q.file" target="_blank"> Leer texto</a>
		</div>
			<div class="container">
				
				<div class="table">
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Preguntas</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody >
							<tr v-for="(item, index) in questions" :key="index">
								<td>{{index + 1}}</td>
								<td>
								<div class="row">
									<div class="col-md-6">
									<div class="col-md-8">
										{{item.question}}	
									</div>
									<div class="col-md-4">
										<i class="material-icons">
										star
										</i> {{item.points}} </br>
										<i class="material-icons">
										timer
										</i> {{item.time}}</br>
									</div>
								</div>
								</div>
									<div class="row">
										<div class="col-md-6" v-for="(answer, index) in item.Answers" :key="index">
											<div class="row">
												<div class="col-md-8">
													<td>{{answer.answer}}</td>
												</div>
												<div class="col-md-4">
													<button class="btn btn-acept" v-b-modal.editAnswer v-on:click="save(item)" v-if="user.rolId == 1">
														<i class="material-icons">edit</i>
													</button>
												</div>
											</div>											
										</div>
									</div>
								</td>
								<td>	
									<button v-b-modal.editQuestions class="btn btn-editQuestions" v-on:click="save(item)" v-if="user.rolId == 1">Editar pregunta
									</button>	
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<b-modal id="editQuestions" ref="editQuestions" hide-footer  centered>
				<textarea type="text" class="form-control" v-model="form.question" placeholder="Cambiar pregunta" ></textarea>
				<input type="text" class="form-control" v-model="form.time" placeholder="Ingrese tiempo">
				<input type="text" class="form-control" v-model="form.points" placeholder="Ingrese puntuación">
				<button class="btn btn-acept" v-on:click="editQuestion()">Cambiar</button>
				<button class="btn btn-close" v-on:click="closeModal()">Cancelar</button>
		 	</b-modal>

		 	<b-modal id="editAnswer" ref="editAnswer" hide-footer  centered>
		 		<div>
		 		<textarea type="text" class="form-control" placeholder="Cambiar respuesta" v-model="form.answer"></textarea>
		 		<button class="btn btn-acept" v-on:click="editAnswer()">Cambiar</button>
				<button class="btn btn-close" v-on:click="closeModal()">Cancelar</button>
			</div>
		 	</b-modal>

		 	<b-modal id="addQuestion" ref="addQuestion" hide-footer centered>
		 		<form >
				<div class="row">
					<div class="col-md-6">
						<div class="table">
							<th>Nueva pregunta</th>
								<textarea type="text" class="form-control" placeholder="Escribir pregunta" v-model="form.question"></textarea>								
								<div class="row">
									<div class="col-md-8">
										<textarea type="text" class="form-control" placeholder="Escribir respuestas" v-model="answer"></textarea>
									</div>
									<div class="col-md-4">
										<button v-on:click="add()" class="btn btn-primary">+</button>
									</div>
								</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="table">
							<table>
								<thead>
									<tr>
										<th>Respuestas</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(item, index) in answers" :key="index">
									<div class="row">
										<div class="col-md-8">
											<td>{{item.text}}</td>
										</div>
										<div class="col-md-4">
											<button class="btn btn-check" v-on:click="change(index)">
						 					<i class="material-icons">check</i>
											</button>
											<button class="btn btn-del" v-on:click="del(index)">
											<i class="material-icons">delete</i>
											</button>
										</div>
									</div>								

									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<button class="btn btn-acept" type="submit" v-on:click="addQuestion()">Agregar</button>
				<button class="btn btn-close" v-on:click="closeModal()">Cancelar</button>
			</form>
		 	</b-modal>
		</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import {
	QUESTIONS_INDEX,
	QUESTIONS_ADD,
	QUESTIONS_EDIT,
	ANSWERS_EDIT,
	QUES_SHOW
} from "@/store/actions.type";

export default {
	computed: {
		...mapGetters(["user"])
	},
 	data: function() {
	  return {
	    
	    curItem: {},
	    q: {},
    	filters: {},
    	form: {},
    	questions:[],
    	answers: [],
			answer: ''
		}
	},
	methods: {
		closeModal(){
			this.$refs.addQuestion.hide();
			this.$refs.editQuestions.hide();
			this.$refs.editAnswer.hide();
			this.$refs.Upload.hide();
		},
		save(item){
			this.form.id = item.id;
			console.log(this.form);
			this.curItem = item;
		},
		clean() {
			this.answers = [];
			this.question = '';
			this.answer= '';
		},
		add (){
			
			this.answers.push({
				text: this.answer,
				correct: null
			});

			console.log(this.answers);
			this.answer = '';
		},

		change (index){
			console.log('change ', index);
			this.answers[index].correct = true;
		},

		del (index){
			console.log(index);
			this.answers.splice(index, 1);
		},
		index () {
			this.filters.qId = this.$route.params.qId;
			this.$store.dispatch(QUESTIONS_INDEX, this.filters)
			.then( questions => {
				this.questions = questions;
			});

			this.filters.id = this.filters.qId;
			this.$store.dispatch(QUES_SHOW, this.filters)
			.then( q => {
				this.q = q;
			});
		},
		addQuestion(){
			this.$refs.addQuestion.hide();
			this.form['answers'] = this.answers;
			this.form.qId = this.$route.params.qId;
			this.$store.dispatch(QUESTIONS_ADD, this.form).
			then( result => {
				this.clean();
				this.index();
				this.$snotify.success(result.message);
			})

		},
		editQuestion(){
			this.$refs.editQuestions.hide();
			this.$store.dispatch(QUESTIONS_EDIT, this.form).
			then( result => {
				this.form = {};
				this.index();
				this.$snotify.success(result.message);
			});
		},
		editAnswer(){
			this.$refs.editAnswer.hide();
			this.$store.dispatch(ANSWERS_EDIT, this.form).
			then( result => {
				this.clean();
				this.index();
				this.$snotify.success(result.message);
			});
		}
	}	,
	mounted () {
		this.index();
	}
}
</script>

<style lang="scss">

.question-page{
	background:#D6DBDF;
	min-height:100vh;
	padding: 30px;


	.button{
		float: right;
		margin-right: 50px;
	}

	.form{
		padding: 20px;
		box-shadow: 0 0 20px rgba(0,0,0, 0.4);
		background: #fff;
		border-radius: 10px;
		margin-bottom: 20px;
		margin-left: 10px;
		max-width: 70%;
	}

	.questions{
		font-size: 20px;
		font-family: sans-serif;
	}
	.btn-editQuestions{
		margin-top: 15px;
		background: #1CB0F6;
		box-shadow: 2px 2px #05587f;
		border-radius: 15px;
		color: white;
		font-weight: bold;
		&:hover{
			background: #85C1E9;
		}
	}

	.btn-acept{
		margin-top: 15px;
		background: #1CB0F6;
		box-shadow: 2px 2px #05587f;
		border-radius: 15px;
		margin-left: 15px;
		color: white;
		&:hover{
			background: #85C1E9;
		}
	}
	.btn2{
		text-decoration: none;
		color:white;
		font-weight: bold;
	}
	.btn-add{
		float: right;
		background: #b0eb00;
		border-radius: 15px;
		border-bottom: 5px solid #7ba207;
		color: white;
		font-weight: bold;
		&:hover{
			background:#8EE000;
			border-bottom:0px;
			margin-top: 5px;
		}
	}
	.btn-read{
		float: right;
		background: #f7a623;
		border-radius: 15px;
		margin-right: 3px;
		border-bottom: 5px solid #926d0f;
		color: white;
		font-weight: bold;
		&:hover{
			background:#ffca75;
			border-bottom:0px;
			margin-top: 5px;
		}
	}
	.btn-upload{
		float: right;
		background: #8549BA;
		margin-right: 3px;
		border-radius: 15px;
		border-bottom: 5px solid #4d327d;
		color: white;
		font-weight: bold;
		&:hover{
			background:#A560EB;
			border-bottom:0px;
			margin-top: 5px;
		}
	}

	.form-control{
		margin-bottom: 10px;
	}
	.btn-check{
		font-size: 10px;
		background: #7AC70C;
		border-radius: 10px;
		color: white;
		padding: 5px;
		&:hover{
			background: #BFF199;

		}
	}

	.btn-del{
		font-size: 10px;
		background: #E53B3B;
		border-radius: 10px;
		color: white;
		padding: 5px;
		margin-left: 10px;
		&:hover{
			background: #FF9797;
		}
	}

	.btn-close{
		margin-top: 15px;
		background: #E53B3B;
		box-shadow: 2px 2px #82141e;
		border-radius: 15px;
		margin-left: 15px;
		color: white;
		&:hover{
			background:#FF9797;
		}
	}
}

	
</style>