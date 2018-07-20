import SimplSchema from 'simpl-schema';

export default new SimplSchema({
	comment : 
	{ 
		type : String
	},
	userId : 
	{ 
		type : String, 
		optional : true 
	},
	authorEmail : 
	{ 
		type : String, 
		optional : true 
	},
	postId : 
	{ 
		type : String, 
		optional : true 
	},
	createdAt : 
	{ 
		type : Date, 
		autoValue: function()
		{
			if (!this.operator) {
				if (!this.isSet || this.value === null || this.value === "")
				return new Date();
			}
			else
			{
				this.unset();
			}
		}
	}
});