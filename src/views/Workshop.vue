<template>
	<div class="workshop-page">
		<div class="form">
			
			<div class="text">
			<p>
				
					Qué es Epistemología:

					La epistemología es una rama de la filosofía que se ocupa de estudiar la naturaleza, el origen y la validez del conocimiento.

					La palabra epistemología está compuesta por las palabras griegas ἐπιστήμη (epistéme), que significa ‘conocimiento’, y λόγος (lógos), que traduce ‘estudio’ o ‘ciencia’.

					En este sentido, la epistemología estudia los fundamentos y métodos del conocimiento científico. Para ello, toma en cuenta factores de tipo histórico, social y psicológico con el objeto de determinar el proceso de construcción del conocimiento, su justificación y veracidad.

					De allí que la epistemología procura dar respuestas a preguntas como: ¿qué es el conocimiento?, ¿deriva de la razón o de la experiencia?, ¿cómo determinamos que aquello que hemos entendido es, en efecto, verdad?, ¿qué logramos con esta verdad?

					Por esta razón la epistemología es una disciplina que se acostumbra a aplicar en las ciencias a fin de establecer el grado de certeza del conocimiento científico en sus diferentes áreas. De esta manera, la epistemología también se puede considerar parte de la filosofía de la ciencia.


			</p>	
			</div>
			<button v-b-modal.addQuestion class="btn btn-add" >Crear pregunta</button>
			<div class="download">
				<i class="material-icons">
					arrow_downward
				</i>
				Descarga aquí</div>
		</div>
			<b-modal id="addQuestion" ref="addQuestion" hide-footer hide-header size="lg"centered>
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
				<button class="btn btn-add" type="submit" v-on:click="addQuestion()">Agregar</button>
				<button class="btn btn-acept" v-on:click="closeModal()">Cancelar</button>
			</form>
		 	</b-modal>	
	</div>


</template>

<script>
import { mapGetters } from "vuex";
import {
	QUESTIONS_INDEX,
	QUESTIONS_ADD
} from "@/store/actions.type";

export default {
	computed: {
	},
 	data: function() {
	  return {
	    
	    curItem: {},
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
		},
		save(item){
			this.curItem = item;
		},
		clean() {
			this.answers = [];
			this.question = '';
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
		save(item){

		},
		index () {
			this.$store.dispatch(QUESTIONS_INDEX, this.filters)
			.then( questions => {
				this.questions = questions;
			});
		},
		addQuestion(){
			this.$refs.addQuestion.hide();
			this.form['answers'] = this.answers;
			this.$store.dispatch(QUESTIONS_ADD, this.form).
			then( result => {
				this.clean();
				this.index();
				this.$snotify.success(result.message);
			})

		}
	}	,
	mounted () {
		this.index();
	}
}
</script>

<style lang="scss">

.workshop-page{

	background: #DDDD;
	min-height: 100vh;

	
	.text
	{	
		font-size: 14px;
		max-width: 1000px;
		margin: 0 auto;
		border-radius: 10px;
		padding: 40px;
		box-shadow: 0 0 10px rgba(0,0,0,0.3);
		padding: 70px 0;
	}

	.btn-add{

		margin-top: 20px;
		margin-left: 120px;
		border-radius: 5px;
		background: #8549BA;
		font-family: sans-serif;
		color:white;
		font-weight: 900;
		border-bottom: 5px solid #1d0531;
		&:hover{
			border-bottom: 0px;
			background:#A560EB;
		}
	}
	
	.download{
		font-weight: bold;
		font-size: 14px;
		color:#1CB0F6;
		cursor: pointer;
		float: right;
		margin-bottom: 20px;
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
	.btn-acept{
		margin-top: 15px;
		background: #1CB0F6;
		box-shadow: 2px 2px #05587f;
		border-radius: 5px;
		margin-left: 15px;
		color: white;
		&:hover{
			background: #85C1E9;
		}
	}


}


</style>
