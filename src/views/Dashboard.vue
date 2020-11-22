<template>
	<div class="dashboard-page">
		<div class="dashboard">
				<button class="btn btn-dashboard">
				<router-link class="btn2" :to="{name: 'game'}">¡Jugar!</router-link>
			</button></br>

			<button class="btn btn-group" v-if="user.rolId == 1" >
				<router-link class="btn1" :to="{name: 'groups'}" >Ver grupos</router-link>
			</button></br>
			<button class="btn btn-group">
				<router-link class="btn1" :to="{name: 'ask'}">Cuestionarios</router-link>
			</button></br>
			
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters(["user"])
	},
 	data: function() {
	    return {
	      	form: {}
		}
	},
	methods: {
		
	}	,
	mounted () {
	}
}
</script>

<style lang="scss">
.dashboard-page {
	background: #D6DBDF;
	min-height: 100vh;

	.dashboard {
		max-width: 500px;
		min-height: 500px;
		margin: 0 auto;
		border-radius: 10px;
		box-shadow: 0 0 5px rgba(0,0,0,0.2);
		padding: 70px 0;
	}

	.btn-dashboard{
	border-bottom: 10px solid #3c7103;
	background:#7AC70C;
	color: white;
	font-size: 70px;
	font-weight: bolder;
	border-radius: 40px;
	&:hover{
		background:#BFF199;
		border-bottom: 0px;
		margin-top: 10px;
	
	}

	}
	.btn-group {
	margin-top: 30px;
	border-bottom: 5px solid #4039393d;
	border-radius: 20px;
	background:#FFC300;
	color: black;
	width: 50%;
	float:center;
	font-size: 20px;
	text-align: center;
	font-weight:bolder;
	&:hover{
		background:#FFCF7A;
	}


		}

	.btn1{
		text-decoration:none;
		color:white;
		font-size: 24px;
		margin-left: 45px;
	}

	.btn2{
		text-decoration: none;
		color: white; 
	}
}
	
</style>
