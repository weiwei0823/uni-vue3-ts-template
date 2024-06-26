<template>
	<div>
		<LHRadio v-for="(option, index) in options" :key="index" :value="option.id === value"
			@input="handleChange(option.id)">
			<slot v-bind="option"></slot>
		</LHRadio>
	</div>
</template>

<script>
import LHRadio from '@/components/common/LHRadio/index.vue';

export default {
	components: {
		LHRadio,
	},
	props: {
		options: {
			type: Array,
			required: true,
		},
		value: [String, Number, Boolean],
	},
	methods: {
		handleChange(newValue) {
			this.$emit('input', newValue);
		},
	},
};
</script>
