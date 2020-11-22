<template>
	<div class="upload-page">
		<div class="form">
			<b-form-file v-model="file" :state="Boolean(file)" type="file" class="form-control" placeholder="Escoge un archivo" >
    		</b-form-file>
    	</form>	
			<button class="btn btn-game">Enviar</button>			
		</div>		
	</div>
</template>

<style lang="scss">
  .upload-page{
    background: #BCE9FF;
    min-height: 100vh;
  }
</style>
