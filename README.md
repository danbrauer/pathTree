little weekend project 

aim was to try to better understand javascript objects, and remind myself how trees work.  (i never studied comp sci so the only thing I know about trees and recursion is what I've learned on jobs and prepping for interviews.)

the origin of this was a problem at work: we needed to combine api paths (e.g., 'domain/the/stuff/after/a/domain/is/the/path') from multiple sources into 1 cloudformation doc from which we'd create an AWS API Gateway.

we thought we'd have to combo all the paths into a tree, because that's how the CloudFormation would need to be written

we quickly realized we could just plug the paths into a swagger template and AWS would do the rest for us, but it made me want to try do the tree thing

NOTE
- this is not well documented
- if this were real, there'd be some validations, plus unit tests and linting...
- i bet i could've made the code cleaner and easier to read if i'd made it more functional... as is, it may be a bit janky... 

 




 