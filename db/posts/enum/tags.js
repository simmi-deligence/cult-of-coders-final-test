const PostTagsEnum = {
	Nature : 'Nature',
	Psychology : 'Psychology',
	Music : 'Music',
	Programming : 'Programming',
	ProjectManagement : 'Project Management',
	Other : 'Other'
}

// maybe you want to have them used as human readable 
const PostTagsLabels = {
	'' : 'Select Tag',
    [PostTagsEnum.Nature]: 'Nature',
    [PostTagsEnum.Psychology]: 'Psychology',
    [PostTagsEnum.Music]: 'Music',
    [PostTagsEnum.Programming]: 'Programming',
    [PostTagsEnum.ProjectManagement]: 'Project Management',
    [PostTagsEnum.Psychology]: 'Psychology',
    [PostTagsEnum.Other]: 'Other',
}

export default PostTagsEnum;
export {

	PostTagsEnum,
	PostTagsLabels
}
