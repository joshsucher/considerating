Rails.application.config.middleware.use OmniAuth::Builder do
     provider :google_oauth2, ENV['OAUTH_CLIENTID'], ENV['OAUTH_SECRET'], {access_type: 'online', approval_prompt: '', :scope => 'https://www.googleapis.com/auth/userinfo.profile', client_options: {ssl: {ca_file: Rails.root.join('lib/assets/cacert.pem').to_s}}}
end