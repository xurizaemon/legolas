require 'bootstrap-sass'
require 'compass/import-once/activate'
# Require any additional compass plugins here.
require 'breakpoint'

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "css"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"

# environment = :development

if environment == :production
  sourcemap = false
  output_style = :expanded
  line_comments = false
  enable_sourcemaps = true
  sass_options = {
    :debug_info => false,
    :enable_sourcemaps => false,
    :sourcemap => false
  }
else
  sourcemap = true
  output_style = :expanded
  line_comments = true
  enable_sourcemaps = true
  sass_options = {
    :debug_info => true,
    :enable_sourcemaps => true,
    :sourcemap => true
  }
end
