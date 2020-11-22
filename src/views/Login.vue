<template>
	<div class="page-login">	
	<div class="row">
	<div class="col-md-4">
		<div class="form">
			<div class="avatar"></div>
			<form v-on:submit.prevent="login()">
				<div class="input-group">
					<input type="text" class="form-control input-form v1" placeholder="Username" v-model="form.username">
				</div>
				<div class="input-group">
					<input type="password" class="form-control input-form" placeholder="Password" v-model="form.password">
				</div>

				<button class="btn btn-game" type="submit">
					<div class="btn2" >Ingresar</div>
				</button>
			</form>
			<button class="btn btn-link" v-on:click="$refs.forgotPassword.show()">Recuperar contraseña</button>
			<button class="btn btn-link">
				<router-link class="btn btn-link" :to="{name: 'register'}">Registrar</router-link>
			</button>
		</div>
	  </div>
		<b-modal id="forgotPassword" ref="forgotPassword" hide-footer hide-header size="sm" centered>
			<div class="form-group">
				<label>Coloca tu correo</label>
				<input type="password" class="form-control" placeholder="Email">
			</div>
			<button class="btn btn-primary">Recuperar</button>
		</b-modal>	
		<div class="col-md-8">
	    <b-carousel
	      id="carousel-1"
	      v-model="slide"
	      :interval="5000"
	      img-width="1024"
	      img-height="300"
	      style="text-shadow: 1px 1px 2px #333;"
	      @sliding-start="onSlideStart"
	      @sliding-end="onSlideEnd"
	    >
	  
	      <b-carousel-slide 
	      img-src="/pensamientoCritico.png"></b-carousel-slide>
	      <b-carousel-slide img-src="/gamificacion.png"></b-carousel-slide>
	      <b-carousel-slide img-src="/gamification.png"></b-carousel-slide>
	    </b-carousel>
	  </div>
	  
	</div>
	</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import {
	LOGIN
} from "@/store/actions.type";

export default {
	computed: {
		
	},
 	data: function() {
	    return {
	      	form: {},
	      	slide: 0,
        	sliding: null
		}
	},
	methods: {
		login () {
			this.$store.dispatch(LOGIN, this.form)
			.then( () => this.$router.push({name: "dashboard" }))
			.catch( error => this._handleError(error) );
		},
		_handleError (error) {
			this.form.password = "";
			this.$snotify.error(error.message);
		},
		onSlideStart(slide) {
        this.sliding = true
      },
     onSlideEnd(slide) {
        this.sliding = false
      }
	}	,
	mounted () {
	}
}
</script>
