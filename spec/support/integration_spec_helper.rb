require 'rack/test_server'

RSpec.configure do |config|
  config.before(:suite) do
    # Launch Rails application
    test_server = Rack::TestServer.new(
      # options for Rack::Server
      # https://github.com/rack/rack/blob/2.2.3/lib/rack/server.rb#L173
      app: Rails.application,
      server: :puma,
      Host: '127.0.0.1',
      Port: 4000,
      daemonize: false,

      # options for Rack::Handler::Puma
      # https://github.com/puma/puma/blob/v5.4.0/lib/rack/handler/puma.rb#L84
      Threads: '0:4',
      workers: 0,
    )

    test_server.start_async
    test_server.wait_for_ready
  end
end
